import { verifySession } from '@/lib/dal'
import { mockUsers } from '@/lib/mock/dealers'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default async function UsersPage() {
  const session = await verifySession()
  const users = mockUsers.filter((u) => u.dealerId === session.dealerId)

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[var(--color-brand-blue)] font-display">
            Account Users
          </h2>
          <button className="text-sm font-semibold text-[var(--color-brand-blue)] hover:underline font-body">
            + Invite User
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {users.map((user) => (
            <div key={user.id} className="py-3 flex items-center justify-between">
              <div className="font-body">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.phone ?? user.email}</p>
              </div>
              <Badge variant={user.role === 'dealer' ? 'blue' : 'gray'}>
                {user.role === 'dealer' ? 'Dealer Manager' : user.role}
              </Badge>
            </div>
          ))}
          {users.length === 0 && (
            <p className="py-4 text-sm text-gray-400 text-center font-body">
              No users found.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
