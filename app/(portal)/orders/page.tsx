import Link from 'next/link'
import { verifySession } from '@/lib/dal'
import { getOrdersByDealer } from '@/lib/mock/orders'
import OrderRow from '@/components/portal/OrderRow'
import type { OrderStatus } from '@/types'

const STATUS_TABS: { label: string; value: string }[] = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Dispatched', value: 'dispatched' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const session = await verifySession()
  const { status } = await searchParams
  const orders = getOrdersByDealer(session.dealerId, status || undefined)

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-body">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        <Link
          href="/orders/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-blue)] text-white text-sm font-semibold px-4 py-2 hover:bg-[var(--color-brand-blue)]/90 transition-colors font-body"
        >
          + New Order
        </Link>
      </div>

      {/* Status filter tabs — GET form, zero JS */}
      <div className="flex flex-wrap gap-1.5">
        {STATUS_TABS.map(({ label, value }) => {
          const isActive = (status ?? '') === value
          return (
            <Link
              key={value}
              href={value ? `/orders?status=${value}` : '/orders'}
              className={[
                'rounded-full px-3 py-1 text-xs font-semibold font-body transition-colors',
                isActive
                  ? 'bg-[var(--color-brand-blue)] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ].join(' ')}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
          <p className="text-gray-400 font-body text-sm">No orders found.</p>
          <Link href="/orders/new" className="mt-3 inline-block text-sm text-[var(--color-brand-blue)] hover:underline font-body">
            Place your first order →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
