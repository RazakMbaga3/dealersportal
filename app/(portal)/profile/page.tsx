import { verifySession } from '@/lib/dal'
import { getDealerById } from '@/lib/mock/dealers'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await verifySession()
  const dealer = getDealerById(session.dealerId)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Card>
        <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display mb-4">
          Company Information
        </h2>
        {dealer ? (
          <dl className="space-y-3 font-body">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <dt className="text-gray-500">Company</dt>
              <dd className="col-span-2 font-semibold text-gray-900">{dealer.companyName}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <dt className="text-gray-500">Region</dt>
              <dd className="col-span-2 text-gray-900">{dealer.region}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <dt className="text-gray-500">Credit Limit</dt>
              <dd className="col-span-2 text-gray-900">TZS {dealer.creditLimit.toLocaleString()}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-gray-400">No dealer data found.</p>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display">
            Delivery Addresses
          </h2>
        </div>
        <div className="space-y-2 font-body">
          {dealer?.addresses.map((addr) => (
            <div key={addr.id} className="flex items-start justify-between rounded-lg bg-gray-50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-gray-900">{addr.label}</p>
                <p className="text-xs text-gray-500">{addr.fullAddress}</p>
              </div>
              {addr.isDefault && (
                <span className="text-xs bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)] rounded-full px-2 py-0.5 font-semibold">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display">
              Users
            </h2>
            <p className="text-sm text-gray-500 mt-0.5 font-body">
              Manage sub-accounts under your dealer profile
            </p>
          </div>
          <Link
            href="/profile/users"
            className="text-sm text-[var(--color-brand-blue)] hover:underline font-body"
          >
            Manage →
          </Link>
        </div>
      </Card>
    </div>
  )
}
