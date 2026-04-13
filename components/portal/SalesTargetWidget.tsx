'use client'

import { useState } from 'react'
import type { SalesStats } from '@/types'

interface SalesTargetWidgetProps {
  mtd: SalesStats
  ytd: SalesStats
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500 font-body">{label}</p>
      <p
        className={`text-lg font-bold font-display leading-tight ${
          highlight ? 'text-[var(--color-brand-orange)]' : 'text-gray-900'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default function SalesTargetWidget({ mtd, ytd }: SalesTargetWidgetProps) {
  const [period, setPeriod] = useState<'mtd' | 'ytd'>('mtd')
  const s = period === 'mtd' ? mtd : ytd

  const salesMT = period === 'mtd' ? s.mtdSalesMT : s.ytdSalesMT
  const targetMT = period === 'mtd' ? s.mtdTargetMT : s.ytdTargetMT
  const achievementPct = targetMT > 0 ? Math.round((salesMT / targetMT) * 100) : 0

  const achievementColor =
    achievementPct >= 90
      ? 'text-[var(--color-brand-green)]'
      : achievementPct >= 70
        ? 'text-[var(--color-brand-orange)]'
        : 'text-red-600'

  const barWidth = Math.min(achievementPct, 100)
  const barColor =
    achievementPct >= 90
      ? 'bg-[var(--color-brand-green)]'
      : achievementPct >= 70
        ? 'bg-[var(--color-brand-orange)]'
        : 'bg-red-500'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display">
          Sales vs Target
        </h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs font-semibold font-body">
          {(['mtd', 'ytd'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 transition-colors ${
                period === p
                  ? 'bg-[var(--color-brand-blue)] text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-gray-400 font-body">Achievement</span>
          <span className={`text-sm font-bold font-display ${achievementColor}`}>
            {achievementPct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Total sale hero */}
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-xs text-gray-500 font-body">Total Sale</span>
        <span className="text-2xl font-bold text-gray-900 font-display">
          {salesMT.toLocaleString()} MT
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Prorated Target" value={`${targetMT.toLocaleString()} MT`} />
        <StatBox label="Achievement" value={`${achievementPct}%`} highlight={achievementPct < 90} />
        <StatBox label="Current Rate" value={`${s.currentRateMTPerDay} MT/day`} />
        <StatBox label="Asking Rate" value={`${s.askingRateMTPerDay} MT/day`} highlight />
      </div>
    </div>
  )
}
