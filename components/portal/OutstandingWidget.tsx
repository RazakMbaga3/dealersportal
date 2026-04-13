import type { Dealer } from '@/types'

function formatTZS(v: number) {
  return 'TZS ' + v.toLocaleString('en-TZ')
}

export default function OutstandingWidget({ dealer }: { dealer: Dealer }) {
  const pct = dealer.creditLimit > 0
    ? Math.min(Math.round((dealer.outstandingBalance / dealer.creditLimit) * 100), 100)
    : 0

  const barColor =
    pct > 80 ? 'bg-red-500' : pct > 60 ? 'bg-[var(--color-brand-orange)]' : 'bg-[var(--color-brand-green)]'

  const available = dealer.creditLimit - dealer.outstandingBalance

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display">
        Outstanding
      </h2>

      <div>
        <p className="text-xs text-gray-500 font-body mb-0.5">Total Outstanding</p>
        <p className="text-2xl font-bold text-gray-900 font-display">
          {formatTZS(dealer.outstandingBalance)}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs font-body text-gray-500 mb-1">
          <span>Credit used: {pct}%</span>
          <span>Limit: {formatTZS(dealer.creditLimit)}</span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500 font-body">Available Credit</p>
          <p className="text-base font-bold text-[var(--color-brand-green)] font-display">
            {formatTZS(Math.max(available, 0))}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500 font-body">Region</p>
          <p className="text-base font-bold text-gray-800 font-display">{dealer.region}</p>
        </div>
      </div>
    </div>
  )
}
