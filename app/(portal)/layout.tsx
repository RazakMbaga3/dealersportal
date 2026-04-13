import { verifySession } from '@/lib/dal'
import { getDealerById } from '@/lib/mock/dealers'
import Sidebar from '@/components/portal/Sidebar'
import TopBar from '@/components/portal/TopBar'

// TopBar title is derived from each page's metadata — here we use a generic fallback
// Individual pages pass their own title via a slot or the TopBar reads from URL on client
export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params?: Promise<Record<string, string>>
}) {
  const session = await verifySession()
  const dealer = getDealerById(session.dealerId)
  const companyName = dealer?.companyName ?? 'My Account'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar companyName={companyName} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar companyName={companyName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
