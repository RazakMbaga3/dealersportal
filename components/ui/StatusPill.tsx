import Badge from './Badge'
import type { OrderStatus, InvoiceStatus } from '@/types'

type AnyStatus = OrderStatus | InvoiceStatus

const statusConfig: Record<AnyStatus, { label: string; variant: 'blue' | 'orange' | 'green' | 'red' | 'gray' }> = {
  // Order statuses
  pending: { label: 'Pending', variant: 'orange' },
  confirmed: { label: 'Confirmed', variant: 'blue' },
  dispatched: { label: 'Dispatched', variant: 'blue' },
  delivered: { label: 'Delivered', variant: 'green' },
  cancelled: { label: 'Cancelled', variant: 'gray' },
  // Invoice statuses
  unpaid: { label: 'Unpaid', variant: 'red' },
  paid: { label: 'Paid', variant: 'green' },
  partial: { label: 'Partial', variant: 'orange' },
}

interface StatusPillProps {
  status: AnyStatus
  className?: string
}

export default function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status] ?? { label: status, variant: 'gray' as const }
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  )
}
