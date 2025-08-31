"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactoStartup() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<string | null>(null)
  const tsRef = useRef<string>("")

  useEffect(() => {
    tsRef.current = String(Date.now())
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrors(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    // Soporta múltiples checkboxes
    const supportAreas = fd.getAll("supportAreas").map(String)
    const data = {
      startupName: fd.get("startupName"),
      country: fd.get("country"),
      city: fd.get("city"),
      email: fd.get("email"),
      website: fd.get("website"),

      founderName: fd.get("founderName"),
      founderLinkedIn: fd.get("founderLinkedIn"),
      founderBio: fd.get("founderBio"),

      problem: fd.get("problem"),
      solution: fd.get("solution"),
      stage: fd.get("stage"),

      motivation: fd.get("motivation"),
      supportAreas,

      deckUrl: fd.get("deckUrl"),
      demoUrl: fd.get("demoUrl"),

      // anti-spam
      hp: fd.get("hp"),
      ts: tsRef.current,
    }

    // Validación rápida cliente
    const email = String(data.email || "")
    if (!String(data.startupName || "").trim()) { setStatus("error"); setErrors("Ingresá el nombre de la startup."); return }
    if (!String(data.country || "").trim()) { setStatus("error"); setErrors("Ingresá el país."); return }
    if (!String(data.city || "").trim()) { setStatus("error"); setErrors("Ingresá la ciudad."); return }
    if (!email.includes("@")) { setStatus("error"); setErrors("Email inválido."); return }

    if (!String(data.founderName || "").trim()) { setStatus("error"); setErrors("Ingresá el nombre del fundador."); return }
    if (!String(data.founderLinkedIn || "").includes("http")) { setStatus("error"); setErrors("LinkedIn del fundador inválido."); return }
    const bio = String(data.founderBio || "")
    if (bio.trim().length < 10 || bio.length > 300) { setStatus("error"); setErrors("La bio debe tener entre 10 y 300 caracteres."); return }

    if (String(data.problem || "").trim().length < 10) { setStatus("error"); setErrors("Describí el problema (10+ caracteres)."); return }
    if (String(data.solution || "").trim().length < 10) { setStatus("error"); setErrors("Describí la solución (10+ caracteres)."); return }
    if (!["Idea","MVP","Usuarios","Revenue"].includes(String(data.stage))) { setStatus("error"); setErrors("Seleccioná el estado actual."); return }

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
        tsRef.current = String(Date.now())
      } else {
        setStatus("error")
        setErrors("No pudimos enviar la postulación. Intentá más tarde.")
      }
    } catch {
      setStatus("error")
      setErrors("Error de red. Verificá tu conexión.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Postulá tu Startup</h1>
      <p className="text-slate-600 mb-8">
        Completá los datos básicos. Te contactaremos por email con los próximos pasos.
      </p>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* 1) Datos básicos */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Datos generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="startupName" placeholder="Nombre de la Startup *" required />
            <Input name="website" placeholder="Sitio web (opcional)" />
            <Input name="country" placeholder="País *" required />
            <Input name="city" placeholder="Ciudad *" required />
            <Input name="email" type="email" placeholder="Email de contacto *" required className="md:col-span-2" />
          </div>
        </section>

        {/* 2) Fundador */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Fundador principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="founderName" placeholder="Nombre y Apellido *" required />
            <Input name="founderLinkedIn" placeholder="LinkedIn del fundador * (URL)" required />
            <Textarea name="founderBio" placeholder="Breve bio (máx. 300 caracteres) *" required maxLength={300} className="md:col-span-2" />
          </div>
        </section>

        {/* 3) Solución */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Sobre la solución</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Textarea name="problem" placeholder="¿Qué problema resuelve? *" required className="md:col-span-2" />
            <Textarea name="solution" placeholder="Describí brevemente la solución *" required className="md:col-span-2" />
            <div>
              <label className="block text-sm mb-1">Estado actual *</label>
              <select name="stage" required className="w-full h-10 rounded-md border border-gray-300 px-3">
                <option value="" disabled selected>Seleccionar</option>
                <option value="Idea">Idea</option>
                <option value="MVP">MVP</option>
                <option value="Usuarios">Usuarios</option>
                <option value="Revenue">Revenue</option>
              </select>
            </div>
          </div>
        </section>

        {/* 4) Motivación */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Motivación</h2>
          <Textarea name="motivation" placeholder="¿Por qué querés unirte a GreyRock? *" required />
          <div className="mt-3">
            <p className="text-sm mb-2">¿Dónde necesitás más apoyo? (opcional)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="supportAreas" value="Producto" />Producto</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="supportAreas" value="Validación" />Validación</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="supportAreas" value="Capital" />Capital / Inversión</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="supportAreas" value="GoToMarket" />Go to Market</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" name="supportAreas" value="Legal" />Legal / Fiscal</label>
            </div>
          </div>
        </section>

        {/* 5) Complementos */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Complementos (opcionales)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="deckUrl" placeholder="Pitch deck (URL)" />
            <Input name="demoUrl" placeholder="Demo / Video (URL)" />
          </div>
        </section>

        {/* Honeypot invisible */}
        <input type="text" name="hp" tabIndex="-1" autoComplete="off" className="hidden" />

        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : "Enviar postulación"}
        </Button>

        {errors && <p className="text-red-600 text-sm">{errors}</p>}
        {status === "success" && (
          <p className="text-green-600 text-sm">¡Gracias! Te contactaremos pronto.</p>
        )}
      </form>

      <p className="mt-6 text-xs text-slate-500">
        Al enviar aceptás ser contactado por el equipo de GreyRock. No compartimos tus datos con terceros.
      </p>
    </div>
  )
}
