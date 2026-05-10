import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts'
import { useAppContext } from '../context/AppContext'
import { LoadingSpinner } from '../components/LoadingSpinner'

const palette = ['#2563EB', '#14B8A6', '#F59E0B']

export function StatsPage() {
  const { timelineEntries, loading } = useAppContext()

  const counts = timelineEntries.reduce(
    (acc, entry) => {
      acc[entry.type] += 1
      return acc
    },
    { Call: 0, Text: 0, Video: 0 } as Record<string, number>,
  )

  const chartData = [
    { name: 'Call', value: counts.Call },
    { name: 'Text', value: counts.Text },
    { name: 'Video', value: counts.Video },
  ]

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Friendship Analytics</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Interaction breakdown</h1>
        <p className="mt-3 text-slate-600">Track how many calls, texts, and video chats are happening across your friend circle.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3}>
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={palette[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={item.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-950" style={{ backgroundColor: palette[index], color: '#fff' }}>
                  {item.name[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
