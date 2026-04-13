// Mock dealer data for Phases 1–3.
// Phase 4 replaces these imports with Prisma query functions.
// All passwords are bcrypt hash of "demo1234".
// Generated with: bcryptjs.hashSync("demo1234", 10)

import type { Dealer, User, Address, SalesStats } from '@/types'

const DEMO_HASH = '$2b$10$zvWpB3rPRKpfFSGu2s7scu.ZzgUsdKCiZZSWMx0ytfFY3LaGS8Xw6'

export const mockDealers: Dealer[] = [
  {
    id: 'dealer_001',
    companyName: 'KARIBU HARDWARE',
    region: 'Dar es Salaam',
    creditLimit: 50_000_000,
    outstandingBalance: 18_500_000,
    addresses: [
      {
        id: 'addr_001a',
        dealerId: 'dealer_001',
        label: 'Main Store',
        fullAddress: 'Kariakoo, Chang\'ombe Road, Dar es Salaam',
        isDefault: true,
      },
      {
        id: 'addr_001b',
        dealerId: 'dealer_001',
        label: 'Warehouse',
        fullAddress: 'Ubungo, Morogoro Road, Dar es Salaam',
        isDefault: false,
      },
    ],
  },
  {
    id: 'dealer_002',
    companyName: 'MWANGA BUILDING SUPPLIES',
    region: 'Arusha',
    creditLimit: 30_000_000,
    outstandingBalance: 7_200_000,
    addresses: [
      {
        id: 'addr_002a',
        dealerId: 'dealer_002',
        label: 'Shop',
        fullAddress: 'Sokoni, Arusha Central, Arusha',
        isDefault: true,
      },
    ],
  },
  {
    id: 'dealer_003',
    companyName: 'SIMBA CEMENT TRADERS',
    region: 'Mwanza',
    creditLimit: 20_000_000,
    outstandingBalance: 4_100_000,
    addresses: [
      {
        id: 'addr_003a',
        dealerId: 'dealer_003',
        label: 'Depot',
        fullAddress: 'Nyamagana, Kenyatta Road, Mwanza',
        isDefault: true,
      },
    ],
  },
]

export const mockUsers: User[] = [
  {
    id: 'user_001',
    dealerId: 'dealer_001',
    name: 'John Mwangi',
    phone: '+255700001001',
    email: 'john@karibuhardware.co.tz',
    passwordHash: DEMO_HASH,
    role: 'dealer',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user_002',
    dealerId: 'dealer_002',
    name: 'Amina Hassan',
    phone: '+255700001002',
    email: 'amina@mwanga.co.tz',
    passwordHash: DEMO_HASH,
    role: 'dealer',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'user_003',
    dealerId: 'dealer_003',
    name: 'Peter Kimaro',
    phone: '+255700001003',
    email: 'peter@simbacement.co.tz',
    passwordHash: DEMO_HASH,
    role: 'dealer',
    createdAt: new Date('2024-03-10'),
  },
]

export const mockSalesStats: SalesStats[] = [
  {
    dealerId: 'dealer_001',
    mtdSalesMT: 420,
    mtdTargetMT: 600,
    ytdSalesMT: 3840,
    ytdTargetMT: 5400,
    currentRateMTPerDay: 18,
    askingRateMTPerDay: 22,
    monthlySales: [
      { month: 'Nov', salesMT: 580, targetMT: 600 },
      { month: 'Dec', salesMT: 620, targetMT: 600 },
      { month: 'Jan', salesMT: 540, targetMT: 600 },
      { month: 'Feb', salesMT: 490, targetMT: 600 },
      { month: 'Mar', salesMT: 610, targetMT: 600 },
      { month: 'Apr', salesMT: 420, targetMT: 600 },
    ],
  },
  {
    dealerId: 'dealer_002',
    mtdSalesMT: 185,
    mtdTargetMT: 250,
    ytdSalesMT: 1620,
    ytdTargetMT: 2250,
    currentRateMTPerDay: 8,
    askingRateMTPerDay: 10,
    monthlySales: [
      { month: 'Nov', salesMT: 230, targetMT: 250 },
      { month: 'Dec', salesMT: 260, targetMT: 250 },
      { month: 'Jan', salesMT: 210, targetMT: 250 },
      { month: 'Feb', salesMT: 195, targetMT: 250 },
      { month: 'Mar', salesMT: 240, targetMT: 250 },
      { month: 'Apr', salesMT: 185, targetMT: 250 },
    ],
  },
  {
    dealerId: 'dealer_003',
    mtdSalesMT: 95,
    mtdTargetMT: 150,
    ytdSalesMT: 780,
    ytdTargetMT: 1350,
    currentRateMTPerDay: 4,
    askingRateMTPerDay: 7,
    monthlySales: [
      { month: 'Nov', salesMT: 120, targetMT: 150 },
      { month: 'Dec', salesMT: 140, targetMT: 150 },
      { month: 'Jan', salesMT: 100, targetMT: 150 },
      { month: 'Feb', salesMT: 115, targetMT: 150 },
      { month: 'Mar', salesMT: 130, targetMT: 150 },
      { month: 'Apr', salesMT: 95, targetMT: 150 },
    ],
  },
]

export function findUserByIdentifier(identifier: string): User | undefined {
  const normalized = identifier.trim().toLowerCase()
  return mockUsers.find(
    (u) =>
      u.phone === identifier ||
      u.email?.toLowerCase() === normalized
  )
}

export function getDealerById(id: string): Dealer | undefined {
  return mockDealers.find((d) => d.id === id)
}

export function getSalesStats(dealerId: string): SalesStats | undefined {
  return mockSalesStats.find((s) => s.dealerId === dealerId)
}
