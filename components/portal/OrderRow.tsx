import Link from 'next/link'
import StatusPill from '@/components/ui/StatusPill'
import type { Order } from '@/types'

function formatTZS(v: number) {
  return 'TZS ' + v.toLocaleString('en-TZ')
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function OrderRow({ order }: { order: Order }) {
  const totalMT = order.products.reduce((s, p) => s + p.quantityMT, 0)
  const productSummary = order.products.map((p) => p.cementType).join(', ')

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      {/* Order info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-[var(--color-brand-blue)] font-display">
            {order.orderNumber}
          </span>
          <StatusPill status={order.status} />
          {order.deliveryPriority === 'urgent' && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-body">
              Urgent
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 font-body mt-0.5 truncate">{productSummary}</p>
        {order.retailerName && (
          <p className="text-xs text-gray-400 font-body">Retailer: {order.retailerName}</p>
        )}
      </div>

      {/* Meta */}
      <div className="hidden sm:flex flex-col items-end text-right shrink-0">
        <span className="text-sm font-semibold text-gray-800 font-body">{totalMT} MT</span>
        <span className="text-xs text-gray-400 font-body">{formatTZS(order.totalAmountTZS)}</span>
        <span className="text-xs text-gray-400 font-body">{formatDate(order.placedAt)}</span>
      </div>

      {/* Arrow */}
      <Link
        href={`/orders/${order.id}`}
        className="shrink-0 rounded-lg p-2 text-gray-300 hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/5 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  )
}
