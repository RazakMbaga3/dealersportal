'use client'

import { useEffect, useRef, useState } from 'react'
import type { Announcement } from '@/types'

export default function AnnouncementTicker({ announcements }: { announcements: Announcement[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (announcements.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [announcements.length])

  if (announcements.length === 0) return null

  const current = announcements[index]

  return (
    <div className="flex items-center gap-3 rounded-lg bg-[var(--color-brand-blue)]/5 border border-[var(--color-brand-blue)]/10 px-4 py-2.5 overflow-hidden">
      <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-orange)] font-display bg-[var(--color-brand-orange)]/10 px-2 py-0.5 rounded">
        Notice
      </span>
      <p className="text-sm text-[var(--color-brand-blue)]/80 font-body truncate">
        <strong className="font-semibold">{current.title}:</strong> {current.body}
      </p>
      {announcements.length > 1 && (
        <span className="shrink-0 text-xs text-gray-400 font-body">
          {index + 1}/{announcements.length}
        </span>
      )}
    </div>
  )
}
