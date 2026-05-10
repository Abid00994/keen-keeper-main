import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { Friend } from '../types'

interface FriendCardProps {
  friend: Friend
}

export function FriendCard({ friend }: FriendCardProps) {
  return (
    <Link to={`/friend/${friend.id}`} className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <img src={friend.picture} alt={friend.name} className="h-16 w-16 rounded-2xl object-cover" />
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{friend.name}</h3>
          <p className="text-sm text-slate-500">{friend.days_since_contact} days since contact</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {friend.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={friend.status} />
        <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-blue-600" />
      </div>
    </Link>
  )
}
