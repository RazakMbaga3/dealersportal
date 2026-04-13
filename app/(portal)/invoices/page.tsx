import { verifySession } from '@/lib/dal'
import { getInvoicesByDealer } from '@/lib/mock/invoices'
import Card from '@/components/ui/Card'
import StatusPill from '@/components/ui/StatusPill'
import Link from 'next/link'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatTZS(amount: number): string {
  return `TZS ${amount.toLocaleString()}`
}

interface PageProps {
  searchParams: Promise<{ from?: string; to?: string; q?: string }>
}

export default async function InvoicesPage({ searchParams }: PageProps) {
  const session = await verifySession()
  const { from, to, q } = await searchParams

  const invoices = getInvoicesByDealer(session.dealerId, { from, to, q })

  return (
    <div className="space-y-5">
      {/* Filter form */}
      <form method="GET" className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-body">
            From Date
          </label>
          <input
            type="date"
            name="from"
            defaultValue={from ?? ''}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-(--color-brand-blue)/40 focus:border-(--color-brand-blue)"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-body">
            To Date
          </label>
          <input
            type="date"
            name="to"
            defaultValue={to ?? ''}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-(--color-brand-blue)/40 focus:border-(--color-brand-blue)"
          />
        </div>
        <div className="flex-1 min-w-40">
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-body">
            Search
          </label>
          <input
            type="text"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Invoice number…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-(--color-brand-blue)/40 focus:border-(--color-brand-blue)"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-(--color-brand-blue) text-white px-4 py-2 text-sm font-semibold font-body hover:bg-(--color-brand-blue)/90 transition-colors"
        >
          Filter
        </button>
        {(from || to || q) && (
          <a
            href="/invoices"
            className="rounded-lg border border-gray-300 text-gray-600 px-4 py-2 text-sm font-semibold font-body hover:bg-gray-50 transition-colors"
          >
            Clear
          </a>
        )}
      </form>

      <Card padding="none">
        {invoices.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-sm font-body">No invoices found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Invoice #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                    Bill Type
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <Link
                        href={`/invoices/${inv.id}`}
                        className="font-semibold text-(--color-brand-blue) hover:underline font-display"
                      >
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(inv.billDate)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                      {inv.billType}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {formatTZS(inv.grossValueTZS)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusPill status={inv.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <p className="text-xs text-gray-400 font-body text-right">
        {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
