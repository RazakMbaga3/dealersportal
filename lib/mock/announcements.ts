import type { Announcement } from '@/types'

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann_001',
    title: 'Price Update',
    body: 'Nyati Super 42.5 prices revised effective 1st August 2024. Contact your sales rep for details.',
    isActive: true,
    expiresAt: null,
  },
  {
    id: 'ann_002',
    title: 'New Product Launch',
    body: 'Introducing Nyati Duramax Plus — superior strength for high-rise construction. Now available for order.',
    isActive: true,
    expiresAt: null,
  },
  {
    id: 'ann_003',
    title: 'Delivery Schedule',
    body: 'Deliveries to Arusha and Mwanza regions will be delayed by 1 day from 20–25 August due to road maintenance.',
    isActive: true,
    expiresAt: null,
  },
  {
    id: 'ann_004',
    title: 'Dealer Incentive Program',
    body: 'Achieve 110% of your monthly target and earn a 2% rebate on total purchases. Valid through Q3 2024.',
    isActive: true,
    expiresAt: null,
  },
]

export function getActiveAnnouncements(): Announcement[] {
  const now = new Date()
  return mockAnnouncements.filter(
    (a) => a.isActive && (!a.expiresAt || a.expiresAt > now)
  )
}
