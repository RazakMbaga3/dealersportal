import { notFound } from 'next/navigation'
import { verifySession } from '@/lib/dal'
import { getInvoiceById } from '@/lib/mock/invoices'
import Card from '@/components/ui/Card'
import StatusPill from '@/components/ui/StatusPill'
import Link from 'next/link'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatTZS(amount: number): string {
  return `TZS ${amount.toLocaleString()}`
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InvoiceDetailPage({ params }: PageProps) {
  const session = await verifySession()
  const { id } = await params

  const invoice = getInvoiceById(id, session.dealerId)
  if (!invoice) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/invoices"
            className="text-xs text-gray-400 hover:text-gray-600 font-body transition-colors"
          >
            ← Invoices
          </Link>
          <h1 className="text-2xl font-bold text-(--color-brand-blue) font-display mt-1">
            {invoice.invoiceNumber}
          </h1>
          <p className="text-sm text-gray-500 font-body mt-0.5">
            {invoice.billType} &bull; {formatDate(invoice.billDate)}
          </p>
        </div>
        <StatusPill status={invoice.status} />
      </div>

      {/* Billed to */}
      <Card>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-body mb-2">
          Billed To
        </h2>
        <p className="text-base font-semibold text-gray-900 font-display">{invoice.soldTo}</p>
      </Card>

      {/* Line items */}
      <Card padding="none">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-body">
            Line Items
          </h2>
        </div>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">
                Description
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500">
                Qty
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 hidden sm:table-cell">
                Unit Price
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoice.lineItems.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-gray-800">{item.description}</td>
                <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                <td className="px-4 py-3 text-right text-gray-600 hidden sm:table-cell">
                  {formatTZS(item.unitPrice)}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">
                  {formatTZS(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td
                colSpan={3}
                className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide font-body"
              >
                Grand Total
              </td>
              <td className="px-4 py-3 text-right font-bold text-(--color-brand-blue) font-display text-base">
                {formatTZS(invoice.grossValueTZS)}
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          disabled
          title="PDF download coming soon"
          className="rounded-lg border border-gray-300 text-gray-400 px-4 py-2 text-sm font-semibold font-body cursor-not-allowed"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
