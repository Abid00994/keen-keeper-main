import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, MessageCircle, Video, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { StatusBadge } from '../components/StatusBadge'

const buttonStyles = 'inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition'

export function FriendDetailsPage() {
  const { id } = useParams()
  const { friends, loading, addTimelineEntry } = useAppContext()

  const friendId = Number(id)
  const friend = friends.find((item) => item.id === friendId)

  const interactionStats = useMemo(
    () => ({
      daysSinceContact: friend?.days_since_contact ?? 0,
      goal: friend?.goal ?? 0,
      nextDueDate: friend?.next_due_date ?? '',
    }),
    [friend],
  )

  const handleCheckIn = (type: 'Call' | 'Text' | 'Video') => {
    if (!friend) return
    addTimelineEntry(type, friend)
    toast.success(`${type} added for ${friend.name}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!friend) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Friend not found</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">We could not locate that profile.</h1>
        <p className="mt-3 text-slate-600">Try selecting a friend from the home page.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Friend details</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{friend.name}</h1>
        </div>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <img src={friend.picture} alt={friend.name} className="h-36 w-36 rounded-[2rem] object-cover shadow-xl" />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-950">{friend.name}</h2>
              <StatusBadge status={friend.status} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {friend.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-slate-600">
            <div>
              <p className="text-sm font-semibold text-slate-900">Bio</p>
              <p className="mt-2 leading-7">{friend.bio}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Email</p>
              <a href={`mailto:${friend.email}`} className="mt-2 inline-block text-slate-600 transition hover:text-slate-950">
                {friend.email}
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button className="rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">⏰ Snooze 2 Weeks</button>
            <button className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">📦 Archive</button>
            <button className="rounded-3xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">🗑️ Delete</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/5 p-4">
                <p className="text-sm text-slate-500">Days Since Contact</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{interactionStats.daysSinceContact}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/5 p-4">
                <p className="text-sm text-slate-500">Goal (days)</p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">{interactionStats.goal}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/5 p-4">
                <p className="text-sm text-slate-500">Next Due Date</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{new Date(interactionStats.nextDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Relationship goal</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">Contact every {friend.goal} days</h2>
              </div>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">Edit</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick check-in</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">Log a quick interaction</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <button onClick={() => handleCheckIn('Call')} className={`${buttonStyles} bg-slate-950 text-white hover:bg-slate-800`}>
                <Phone className="h-4 w-4" /> Call
              </button>
              <button onClick={() => handleCheckIn('Text')} className={`${buttonStyles} bg-slate-100 text-slate-950 hover:bg-slate-200`}>
                <MessageCircle className="h-4 w-4" /> Text
              </button>
              <button onClick={() => handleCheckIn('Video')} className={`${buttonStyles} bg-blue-600 text-white hover:bg-blue-700`}>
                <Video className="h-4 w-4" /> Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
