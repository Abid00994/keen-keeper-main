import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Friend, InteractionType, TimelineEntry } from '../types'

const LOCAL_STORAGE_KEY = 'keen-keeper-timeline'

const initialTimeline: TimelineEntry[] = [
  {
    id: 'timeline-1',
    friendId: 8,
    friendName: 'Leo Nguyen',
    type: 'Call',
    date: '2026-05-09T14:20:00.000Z',
    title: 'Call with Leo Nguyen',
  },
  {
    id: 'timeline-2',
    friendId: 2,
    friendName: 'Maya Lee',
    type: 'Text',
    date: '2026-05-05T18:40:00.000Z',
    title: 'Text with Maya Lee',
  },
  {
    id: 'timeline-3',
    friendId: 1,
    friendName: 'James Park',
    type: 'Video',
    date: '2026-05-02T10:05:00.000Z',
    title: 'Video with James Park',
  },
]

interface AppContextValue {
  friends: Friend[]
  loading: boolean
  timelineEntries: TimelineEntry[]
  addTimelineEntry: (type: InteractionType, friend: Friend) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>([])
  const [loading, setLoading] = useState(true)
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([])

  useEffect(() => {
    async function loadFriends() {
      try {
        const response = await fetch('/friends.json')
        const data: Friend[] = await response.json()
        setFriends(data)
      } catch (error) {
        console.error('Failed to load friend data', error)
      } finally {
        setLoading(false)
      }
    }

    loadFriends()
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setTimelineEntries(JSON.parse(stored))
    } else {
      setTimelineEntries(initialTimeline)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timelineEntries))
  }, [timelineEntries])

  const addTimelineEntry = (type: InteractionType, friend: Friend) => {
    const newEntry: TimelineEntry = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      friendId: friend.id,
      friendName: friend.name,
      type,
      date: new Date().toISOString(),
      title: `${type} with ${friend.name}`,
    }

    setTimelineEntries((prev) => [newEntry, ...prev])
  }

  const value = useMemo(
    () => ({ friends, loading, timelineEntries, addTimelineEntry }),
    [friends, loading, timelineEntries],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
