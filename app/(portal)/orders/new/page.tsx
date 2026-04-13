import { verifySession } from '@/lib/dal'
import { getDealerById } from '@/lib/mock/dealers'
import NewOrderForm from './NewOrderForm'

export default async function NewOrderPage() {
  const session = await verifySession()
  const dealer = getDealerById(session.dealerId)

  return (
    <div className="max-w-2xl mx-auto">
      {dealer && <NewOrderForm dealer={dealer} />}
    </div>
  )
}
