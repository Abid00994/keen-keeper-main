interface SummaryCardProps {
  label: string
  value: string
  description: string
}

export function SummaryCard({ label, value, description }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <h3 className="mt-4 text-3xl font-semibold text-slate-950">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}
