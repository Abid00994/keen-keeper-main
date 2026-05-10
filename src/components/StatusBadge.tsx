import type { FriendStatus } from '../types'

const badgeStyles: Record<FriendStatus, string> = {
  overdue: 'bg-rose-100 text-rose-700',
  'almost due': 'bg-amber-100 text-amber-700',
  'on-track': 'bg-emerald-100 text-emerald-700',
}

interface StatusBadgeProps {
  status: FriendStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}>
      {status}
    </span>
  )
}
