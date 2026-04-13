// Shared TypeScript types — used by both mock data and Prisma query functions
// so Phase 4 DB swap is a one-line import change per file.

export type UserRole = 'dealer' | 'sub_user' | 'admin'
export type OrderStatus = 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'
export type InvoiceStatus = 'unpaid' | 'paid' | 'partial'
export type DeliveryPriority = 'standard' | 'urgent'

export interface Dealer {
  id: string
  companyName: string
  region: string
  creditLimit: number
  outstandingBalance: number
  addresses: Address[]
}

export interface Address {
  id: string
  dealerId: string
  label: string
  fullAddress: string
  isDefault: boolean
}

export interface User {
  id: string
  dealerId: string
  name: string
  phone: string | null
  email: string | null
  passwordHash: string
  role: UserRole
  createdAt: Date
}

export interface OrderProduct {
  cementType: string
  quantityMT: number
  pricePerMT: number
}

export interface Order {
  id: string
  dealerId: string
  orderNumber: string
  status: OrderStatus
  products: OrderProduct[]
  deliveryAddress: string
  deliveryPriority: DeliveryPriority
  retailerName: string | null
  notes: string | null
  totalAmountTZS: number
  placedAt: Date
  updatedAt: Date
  emailSent: boolean
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  dealerId: string
  invoiceNumber: string
  billType: string
  soldTo: string
  billDate: Date
  grossValueTZS: number
  status: InvoiceStatus
  lineItems: InvoiceLineItem[]
  pdfUrl: string | null
}

export interface Announcement {
  id: string
  title: string
  body: string
  isActive: boolean
  expiresAt: Date | null
}

export interface MonthlyStat {
  month: string
  salesMT: number
  targetMT: number
}

export interface SalesStats {
  dealerId: string
  mtdSalesMT: number
  mtdTargetMT: number
  ytdSalesMT: number
  ytdTargetMT: number
  currentRateMTPerDay: number
  askingRateMTPerDay: number
  monthlySales: MonthlyStat[]
}

export interface SessionPayload {
  userId: string
  dealerId: string
  role: UserRole
  expiresAt: Date
}
