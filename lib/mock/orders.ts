import type { Order, OrderStatus } from '@/types'

const CEMENT_TYPES = ['Nyati Super 42.5', 'Nyati Duramax 42.5', 'Nyati Premium OPC', 'Nyati Max 32.5']

function makeOrder(
  id: string,
  dealerId: string,
  orderNum: string,
  status: OrderStatus,
  daysAgo: number,
  products: { cementType: string; quantityMT: number; pricePerMT: number }[],
  retailerName: string | null,
  deliveryAddress: string,
  notes?: string
): Order {
  const placedAt = new Date()
  placedAt.setDate(placedAt.getDate() - daysAgo)
  const totalAmountTZS = products.reduce((sum, p) => sum + p.quantityMT * p.pricePerMT, 0)
  return {
    id,
    dealerId,
    orderNumber: orderNum,
    status,
    products,
    deliveryAddress,
    deliveryPriority: daysAgo % 3 === 0 ? 'urgent' : 'standard',
    retailerName,
    notes: notes ?? null,
    totalAmountTZS,
    placedAt,
    updatedAt: placedAt,
    emailSent: true,
  }
}

export const mockOrders: Order[] = [
  // dealer_001 orders
  makeOrder('ord_001', 'dealer_001', 'NYT-2024-0001', 'delivered', 45,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 50, pricePerMT: 195_000 }],
    'JUMA HARDWARE', "Kariakoo, Chang'ombe Road, Dar es Salaam"),

  makeOrder('ord_002', 'dealer_001', 'NYT-2024-0008', 'delivered', 38,
    [{ cementType: CEMENT_TYPES[1], quantityMT: 30, pricePerMT: 198_000 },
     { cementType: CEMENT_TYPES[2], quantityMT: 20, pricePerMT: 205_000 }],
    'AMINA STORES', "Ubungo, Morogoro Road, Dar es Salaam"),

  makeOrder('ord_003', 'dealer_001', 'NYT-2024-0015', 'delivered', 30,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 80, pricePerMT: 195_000 }],
    'FATUMA BUILDERS', "Kariakoo, Chang'ombe Road, Dar es Salaam"),

  makeOrder('ord_004', 'dealer_001', 'NYT-2024-0022', 'dispatched', 15,
    [{ cementType: CEMENT_TYPES[3], quantityMT: 40, pricePerMT: 185_000 }],
    'SALIM CONSTRUCTION', "Ubungo, Morogoro Road, Dar es Salaam"),

  makeOrder('ord_005', 'dealer_001', 'NYT-2024-0029', 'confirmed', 8,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 60, pricePerMT: 195_000 },
     { cementType: CEMENT_TYPES[1], quantityMT: 15, pricePerMT: 198_000 }],
    'HASSAN HARDWARE', "Kariakoo, Chang'ombe Road, Dar es Salaam",
    'Deliver before 10am'),

  makeOrder('ord_006', 'dealer_001', 'NYT-2024-0034', 'pending', 3,
    [{ cementType: CEMENT_TYPES[2], quantityMT: 25, pricePerMT: 205_000 }],
    null, "Kariakoo, Chang'ombe Road, Dar es Salaam"),

  makeOrder('ord_007', 'dealer_001', 'NYT-2024-0036', 'pending', 1,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 100, pricePerMT: 195_000 }],
    'NYUMBA BUILDERS LTD', "Ubungo, Morogoro Road, Dar es Salaam",
    'Large project — confirm availability before dispatch'),

  makeOrder('ord_008', 'dealer_001', 'NYT-2023-0088', 'cancelled', 60,
    [{ cementType: CEMENT_TYPES[1], quantityMT: 20, pricePerMT: 198_000 }],
    'OMAR STORES', "Kariakoo, Chang'ombe Road, Dar es Salaam"),

  // dealer_002 orders
  makeOrder('ord_009', 'dealer_002', 'NYT-2024-0003', 'delivered', 40,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 25, pricePerMT: 195_000 }],
    'KILIMANJARO BUILDERS', 'Sokoni, Arusha Central, Arusha'),

  makeOrder('ord_010', 'dealer_002', 'NYT-2024-0011', 'delivered', 25,
    [{ cementType: CEMENT_TYPES[3], quantityMT: 35, pricePerMT: 185_000 }],
    'MOSHI TRADERS', 'Sokoni, Arusha Central, Arusha'),

  makeOrder('ord_011', 'dealer_002', 'NYT-2024-0019', 'confirmed', 10,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 50, pricePerMT: 195_000 }],
    'ARUSHA HARDWARE CO', 'Sokoni, Arusha Central, Arusha'),

  makeOrder('ord_012', 'dealer_002', 'NYT-2024-0031', 'pending', 2,
    [{ cementType: CEMENT_TYPES[2], quantityMT: 15, pricePerMT: 205_000 }],
    null, 'Sokoni, Arusha Central, Arusha'),

  // dealer_003 orders
  makeOrder('ord_013', 'dealer_003', 'NYT-2024-0005', 'delivered', 35,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 20, pricePerMT: 195_000 }],
    'VICTORIA BUILDERS', 'Nyamagana, Kenyatta Road, Mwanza'),

  makeOrder('ord_014', 'dealer_003', 'NYT-2024-0017', 'dispatched', 12,
    [{ cementType: CEMENT_TYPES[1], quantityMT: 18, pricePerMT: 198_000 }],
    'MWANZA HARDWARE', 'Nyamagana, Kenyatta Road, Mwanza'),

  makeOrder('ord_015', 'dealer_003', 'NYT-2024-0033', 'pending', 4,
    [{ cementType: CEMENT_TYPES[0], quantityMT: 30, pricePerMT: 195_000 }],
    'ZIWA CONSTRUCTION', 'Nyamagana, Kenyatta Road, Mwanza'),
]

export function getOrdersByDealer(dealerId: string, status?: string): Order[] {
  return mockOrders
    .filter((o) => o.dealerId === dealerId && (!status || o.status === status))
    .sort((a, b) => b.placedAt.getTime() - a.placedAt.getTime())
}

export function getOrderById(id: string, dealerId: string): Order | undefined {
  return mockOrders.find((o) => o.id === id && o.dealerId === dealerId)
}

export function getOrderByNumber(orderNumber: string, dealerId: string): Order | undefined {
  return mockOrders.find((o) => o.orderNumber === orderNumber && o.dealerId === dealerId)
}

export function getRecentOrders(dealerId: string, limit = 5): Order[] {
  return getOrdersByDealer(dealerId).slice(0, limit)
}
