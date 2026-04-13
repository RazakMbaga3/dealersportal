import { verifySession } from '@/lib/dal'
import { getDealerById, getSalesStats } from '@/lib/mock/dealers'
import { getRecentOrders } from '@/lib/mock/orders'
import { getActiveAnnouncements } from '@/lib/mock/announcements'
import SalesTargetWidget from '@/components/portal/SalesTargetWidget'
import OutstandingWidget from '@/components/portal/OutstandingWidget'
import AnnouncementTicker from '@/components/portal/AnnouncementTicker'
import PromoBanner from '@/components/portal/PromoBanner'
import OrderRow from '@/components/portal/OrderRow'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await verifySession()
  const dealer = getDealerById(session.dealerId)
  const stats = getSalesStats(session.dealerId)
  const recentOrders = getRecentOrders(session.dealerId, 4)
  const announcements = getActiveAnnouncements()

  if (!dealer || !stats) {
    return (
      <div className="p-8 text-center text-gray-400 font-body">
        Dealer account not configured. Contact support.
      </div>
    )
  }

  // For YTD we reuse the same stats object — in Phase 4 this will be a separate DB query
  const ytdStats = {
    ...stats,
    mtdSalesMT: stats.ytdSalesMT,
    mtdTargetMT: stats.ytdTargetMT,
    currentRateMTPerDay: Math.round(stats.ytdSalesMT / 210), // ~210 working days YTD
    askingRateMTPerDay: Math.round((stats.ytdTargetMT - stats.ytdSalesMT) / 60),
  }

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Announcement ticker */}
      <AnnouncementTicker announcements={announcements} />

      {/* Promo banner */}
      <PromoBanner />

      {/* KPI widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SalesTargetWidget mtd={stats} ytd={ytdStats} />
        <OutstandingWidget dealer={dealer} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Order', href: '/orders/new', bg: 'bg-[var(--color-brand-blue)]' },
          { label: 'Sales Orders', href: '/orders', bg: 'bg-[var(--color-brand-orange)]' },
          { label: 'Invoices', href: '/invoices', bg: 'bg-[var(--color-brand-green)]' },
          { label: 'Performance', href: '/performance', bg: 'bg-gray-700' },
        ].map(({ label, href, bg }) => (
          <Link
            key={href}
            href={href}
            className={`${bg} text-white rounded-xl px-4 py-4 text-sm font-semibold font-body text-center hover:opacity-90 transition-opacity shadow-sm`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-700 font-display uppercase tracking-wider">
              Recent Orders
            </h2>
            <Link href="/orders" className="text-xs text-[var(--color-brand-blue)] hover:underline font-body">
              View all →
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {recentOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
