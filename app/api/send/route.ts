import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValid(body: any) {
  if (!body) return false;
  const {
    startupName, country, city, email, website,
    founderName, founderLinkedIn, founderBio,
    problem, solution, stage,
    motivation, supportAreas,
    deckUrl, demoUrl,
    hp, ts
  } = body;

  if (hp) return false; // honeypot
  const start = Number(ts);
  if (!start || Date.now() - start < 2000) return false;

  if (typeof startupName !== "string" || startupName.trim().length < 2) return false;
  if (typeof country !== "string" || country.trim().length < 2) return false;
  if (typeof city !== "string" || city.trim().length < 2) return false;
  if (typeof email !== "string" || !email.includes("@")) return false;

  if (typeof founderName !== "string" || founderName.trim().length < 2) return false;
  if (typeof founderLinkedIn !== "string" || !founderLinkedIn.includes("http")) return false;
  if (typeof founderBio !== "string" || founderBio.trim().length < 10 || founderBio.length > 300) return false;

  if (typeof problem !== "string" || problem.trim().length < 10) return false;
  if (typeof solution !== "string" || solution.trim().length < 10) return false;
  if (typeof stage !== "string" || !["Idea","MVP","Usuarios","Revenue"].includes(stage)) return false;

  if (supportAreas && !(Array.isArray(supportAreas) || typeof supportAreas === "string")) return false;

  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!isValid(body)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // Construye BCC desde CONTACT_TO (comas)
    const bccEnv = process.env.CONTACT_TO || "";
    const bcc = bccEnv.split(",").map(s => s.trim()).filter(Boolean);

    const subject = `🚀 Postulación Startup — ${body.startupName} (${body.stage})`;

    const support = Array.isArray(body.supportAreas)
      ? body.supportAreas.join(", ")
      : (body.supportAreas || "-");

    const html = `
      <h2>Postulación de Startup</h2>
      <h3>Datos básicos</h3>
      <ul>
        <li><b>Startup:</b> ${body.startupName}</li>
        <li><b>País / Ciudad:</b> ${body.country} / ${body.city}</li>
        <li><b>Email:</b> ${body.email}</li>
        <li><b>Sitio web:</b> ${body.website || "-"}</li>
      </ul>
      <h3>Fundador principal</h3>
      <ul>
        <li><b>Nombre:</b> ${body.founderName}</li>
        <li><b>LinkedIn:</b> ${body.founderLinkedIn}</li>
        <li><b>Bio (300 máx):</b> ${body.founderBio}</li>
      </ul>
      <h3>Solución</h3>
      <ul>
        <li><b>Problema:</b> ${body.problem}</li>
        <li><b>Solución:</b> ${body.solution}</li>
        <li><b>Estado:</b> ${body.stage}</li>
      </ul>
      <h3>Motivación</h3>
      <ul>
        <li><b>Por qué GreyRock:</b> ${body.motivation}</li>
        <li><b>Apoyo requerido:</b> ${support}</li>
      </ul>
      <h3>Complementos</h3>
      <ul>
        <li><b>Pitch deck:</b> ${body.deckUrl || "-"}</li>
        <li><b>Demo / Video:</b> ${body.demoUrl || "-"}</li>
      </ul>
    `;

    const { error } = await resend.emails.send({
      from: "GreyRock <contacto@greyrock.studio>", // dominio verificado
      to: "no-reply@greyrock.studio",              // placeholder (los reales van en BCC)
      bcc,                                         // todos en BCC
      subject,
      html,
      reply_to: body.email,                        // responder directo al founder
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
