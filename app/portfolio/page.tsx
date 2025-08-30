type Case = { name: string; blurb: string }

const cases: Case[] = [
  { name: 'MAVDI', blurb: 'App móvil para redes de venta. Pilotos en LATAM.' },
  { name: 'MoniNurse', blurb: 'Plataforma + carro inteligente para enfermería.' },
  { name: 'NextProxi', blurb: 'Herramientas de campo para última milla operativa.' }
]

export default function Portfolio() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Portfolio</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {cases.map(c => (
          <div key={c.name} className="rounded-2xl border p-6">
            <h3 className="text-xl font-medium">{c.name}</h3>
            <p className="mt-2 text-zinc-700">{c.blurb}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
