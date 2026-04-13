import { verifySession } from '@/lib/dal'
import { getSalesStats } from '@/lib/mock/dealers'
import Card from '@/components/ui/Card'
import SalesChart from '@/components/portal/SalesChart'

export default async function PerformancePage() {
  const session = await verifySession()
  const stats = getSalesStats(session.dealerId)

  const achievement = stats
    ? Math.round((stats.mtdSalesMT / stats.mtdTargetMT) * 100)
    : 0

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'MTD Sales', value: stats ? `${stats.mtdSalesMT} MT` : '—' },
          { label: 'MTD Target', value: stats ? `${stats.mtdTargetMT} MT` : '—' },
          { label: 'MTD Achievement', value: stats ? `${achievement}%` : '—' },
        ].map(({ label, value }) => (
          <Card key={label}>
            <p className="text-xs text-gray-500 font-body">{label}</p>
            <p className="text-2xl font-bold text-(--color-brand-blue) font-display mt-1">
              {value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-gray-500 font-body">Daily Rate (Current)</p>
          <p className="text-2xl font-bold text-(--color-brand-orange) font-display mt-1">
            {stats ? `${stats.currentRateMTPerDay} MT/day` : '—'}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-body">Asking Rate (Required)</p>
          <p className="text-2xl font-bold text-(--color-brand-blue) font-display mt-1">
            {stats ? `${stats.askingRateMTPerDay} MT/day` : '—'}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 font-body">YTD Achievement</p>
          <p className="text-2xl font-bold text-(--color-brand-blue) font-display mt-1">
            {stats
              ? `${Math.round((stats.ytdSalesMT / stats.ytdTargetMT) * 100)}%`
              : '—'}
          </p>
          {stats && (
            <p className="text-xs text-gray-400 font-body mt-0.5">
              {stats.ytdSalesMT} / {stats.ytdTargetMT} MT
            </p>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-bold text-(--color-brand-blue) font-display mb-4">
          Monthly Sales vs Target
        </h2>
        {stats?.monthlySales ? (
          <SalesChart data={stats.monthlySales} />
        ) : (
          <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-gray-400 font-body">No data available.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
