import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SummaryCard } from '../components/SummaryCard'
import { FriendCard } from '../components/FriendCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAppContext } from '../context/AppContext'

function formatDueDate(days: number) {
  if (days <= 7) return 'Due soon'
  return `${days} days until next follow-up`
}

export function HomePage() {
  const { friends, loading, timelineEntries } = useAppContext()

  const totalFriends = friends.length
  const overdue = friends.filter((friend) => friend.status === 'overdue').length
  const onTrack = friends.filter((friend) => friend.status === 'on-track').length
  const nextDue = friends
    .map((friend) => ({ ...friend, dueIn: Math.max(0, Math.round((new Date(friend.next_due_date).getTime() - Date.now()) / 86400000)) }))
    .sort((a, b) => a.dueIn - b.dueIn)
    .slice(0, 1)

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 px-8 py-14 text-white shadow-2xl shadow-slate-950/20 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Friendship care made easy</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Keep every connection active, thoughtful, and on track.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Create a consistent routine for reaching out, log every interaction, and see your friendship patterns at a glance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              Add a Friend
            </Link>
            <Link
              to="/timeline"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white transition hover:border-white hover:bg-white/20"
            >
              View Timeline
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total friends" value={`${totalFriends}`} description="Friends you want to check in with regularly." />
        <SummaryCard label="Interactions" value={`${timelineEntries.length}`} description="Recent call, text, and video check-ins logged." />
        <SummaryCard label="Overdue" value={`${overdue}`} description="Friends who need a follow-up soon." />
        <SummaryCard label="On track" value={`${onTrack}`} description="Friends with consistent contact status." />
      </div>

      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Your friends</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Keep your social circle in view</h2>
        </div>
        {nextDue[0] ? (
          <div className="rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white shadow-lg shadow-slate-950/10">
            Next due: <span className="font-semibold">{nextDue[0].name}</span> — {formatDueDate(nextDue[0].dueIn)}
          </div>
        ) : null}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </section>
  )
}
