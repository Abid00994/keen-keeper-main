import { useMemo, useState } from 'react'
import { Phone, MessageCircle, Video, Calendar } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { LoadingSpinner } from '../components/LoadingSpinner'
import type { InteractionType } from '../types'

const filterOptions: Array<'All' | InteractionType> = ['All', 'Call', 'Text', 'Video']

const iconMap: Record<InteractionType, typeof Phone> = {
  Call: Phone,
  Text: MessageCircle,
  Video: Video,
}

export function TimelinePage() {
  const { timelineEntries, loading } = useAppContext()
  const [filter, setFilter] = useState<'All' | InteractionType>('All')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const entries = useMemo(() => {
    const filtered = filter === 'All' ? timelineEntries : timelineEntries.filter((item) => item.type === filter)
    return filtered.sort((a, b) => (sortOrder === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)))
  }, [filter, sortOrder, timelineEntries])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timeline</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Recent interactions</h1>
          <p className="mt-3 text-slate-600">Review all calls, texts, and video check-ins in one place.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === option ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as 'newest' | 'oldest')}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {entries.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No timeline entries match this filter.
          </div>
        ) : (
          entries.map((entry) => {
            const Icon = iconMap[entry.type]
            return (
              <div key={entry.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{entry.title}</p>
                      <p className="text-sm text-slate-500">{new Date(entry.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    <Calendar className="h-4 w-4" /> {entry.friendName}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
