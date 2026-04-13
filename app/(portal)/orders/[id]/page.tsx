import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verifySession } from '@/lib/dal'
import { getOrderById } from '@/lib/mock/orders'
import StatusPill from '@/components/ui/StatusPill'
import Card from '@/components/ui/Card'
import type { OrderStatus } from '@/types'

function formatTZS(v: number) {
  return 'TZS ' + v.toLocaleString('en-TZ')
}
function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_STEPS: OrderStatus[] = ['pending', 'confirmed', 'dispatched', 'delivered']

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  dispatched: 'Dispatched',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await verifySession()
  const { id } = await params
  const order = getOrderById(id, session.dealerId)
  if (!order) notFound()

  const isCancelled = order.status === 'cancelled'
  const currentStepIndex = STATUS_STEPS.indexOf(order.status as OrderStatus)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <Link href="/orders" className="text-sm text-brand-blue hover:underline font-body">
          ← Orders
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-500 font-body">{order.orderNumber}</span>
      </div>

      {/* Header */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 font-body">Order Number</p>
            <h1 className="text-xl font-bold text-brand-blue font-display">{order.orderNumber}</h1>
            <p className="text-xs text-gray-400 font-body mt-0.5">Placed {formatDate(order.placedAt)}</p>
          </div>
          <StatusPill status={order.status} />
        </div>

        {/* Status timeline */}
        {!isCancelled && (
          <div className="mt-5">
            <div className="flex items-center gap-0">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStepIndex
                const isLast = i === STATUS_STEPS.length - 1
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          done ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {done ? '✓' : i + 1}
                      </div>
                      <p className={`text-[10px] mt-1 font-body text-center leading-tight ${done ? 'text-brand-blue font-semibold' : 'text-gray-400'}`}>
                        {STATUS_LABELS[step]}
                      </p>
                    </div>
                    {!isLast && (
                      <div className={`flex-1 h-0.5 mb-4 mx-1 ${i < currentStepIndex ? 'bg-brand-blue' : 'bg-gray-200'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Products */}
      <Card>
        <h2 className="text-sm font-bold text-gray-700 font-display uppercase tracking-wider mb-3">
          Products
        </h2>
        <div className="space-y-2">
          {order.products.map((p, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-gray-900 font-body">{p.cementType}</p>
                <p className="text-xs text-gray-500 font-body">
                  {p.quantityMT} MT × {formatTZS(p.pricePerMT)}/MT
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900 font-display">
                {formatTZS(p.quantityMT * p.pricePerMT)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 font-body">Total</span>
          <span className="text-lg font-bold text-brand-blue font-display">
            {formatTZS(order.totalAmountTZS)}
          </span>
        </div>
      </Card>

      {/* Delivery details */}
      <Card>
        <h2 className="text-sm font-bold text-gray-700 font-display uppercase tracking-wider mb-3">
          Delivery Details
        </h2>
        <dl className="space-y-2 font-body text-sm">
          <div className="grid grid-cols-3 gap-2">
            <dt className="text-gray-500">Address</dt>
            <dd className="col-span-2 text-gray-900">{order.deliveryAddress}</dd>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <dt className="text-gray-500">Priority</dt>
            <dd className="col-span-2">
              {order.deliveryPriority === 'urgent' ? (
                <span className="text-red-600 font-semibold">Urgent</span>
              ) : (
                <span className="text-gray-700">Standard</span>
              )}
            </dd>
          </div>
          {order.retailerName && (
            <div className="grid grid-cols-3 gap-2">
              <dt className="text-gray-500">Retailer</dt>
              <dd className="col-span-2 text-gray-900">{order.retailerName}</dd>
            </div>
          )}
          {order.notes && (
            <div className="grid grid-cols-3 gap-2">
              <dt className="text-gray-500">Notes</dt>
              <dd className="col-span-2 text-gray-900">{order.notes}</dd>
            </div>
          )}
        </dl>
      </Card>
    </div>
  )
}
