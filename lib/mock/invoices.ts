import type { Invoice, InvoiceStatus } from '@/types'

function makeInvoice(
  id: string,
  dealerId: string,
  invoiceNumber: string,
  billType: string,
  soldTo: string,
  billDate: Date,
  status: InvoiceStatus,
  lineItems: { description: string; quantity: number; unitPrice: number; total: number }[],
  pdfUrl?: string
): Invoice {
  const grossValueTZS = lineItems.reduce((sum, item) => sum + item.total, 0)
  return {
    id,
    dealerId,
    invoiceNumber,
    billType,
    soldTo,
    billDate,
    grossValueTZS,
    status,
    lineItems,
    pdfUrl: pdfUrl ?? null,
  }
}

export const mockInvoices: Invoice[] = [
  // ── dealer_001 ──────────────────────────────────────────────────────────────
  makeInvoice(
    'inv_001', 'dealer_001', 'INV-2024-0041', 'Tax Invoice', 'KARIBU HARDWARE',
    new Date('2024-11-05'), 'paid',
    [
      { description: 'Nyati Super 42.5 — 50 MT', quantity: 50, unitPrice: 195_000, total: 9_750_000 },
    ]
  ),
  makeInvoice(
    'inv_002', 'dealer_001', 'INV-2024-0058', 'Tax Invoice', 'KARIBU HARDWARE',
    new Date('2024-11-18'), 'paid',
    [
      { description: 'Nyati Duramax 42.5 — 30 MT', quantity: 30, unitPrice: 198_000, total: 5_940_000 },
      { description: 'Nyati Premium OPC — 20 MT', quantity: 20, unitPrice: 205_000, total: 4_100_000 },
    ]
  ),
  makeInvoice(
    'inv_003', 'dealer_001', 'INV-2024-0075', 'Tax Invoice', 'KARIBU HARDWARE',
    new Date('2024-12-10'), 'paid',
    [
      { description: 'Nyati Super 42.5 — 80 MT', quantity: 80, unitPrice: 195_000, total: 15_600_000 },
    ]
  ),
  makeInvoice(
    'inv_004', 'dealer_001', 'INV-2025-0012', 'Tax Invoice', 'KARIBU HARDWARE',
    new Date('2025-01-22'), 'partial',
    [
      { description: 'Nyati Max 32.5 — 40 MT', quantity: 40, unitPrice: 185_000, total: 7_400_000 },
    ]
  ),
  makeInvoice(
    'inv_005', 'dealer_001', 'INV-2025-0031', 'Tax Invoice', 'KARIBU HARDWARE',
    new Date('2025-02-14'), 'unpaid',
    [
      { description: 'Nyati Super 42.5 — 60 MT', quantity: 60, unitPrice: 195_000, total: 11_700_000 },
      { description: 'Nyati Duramax 42.5 — 15 MT', quantity: 15, unitPrice: 198_000, total: 2_970_000 },
    ]
  ),
  makeInvoice(
    'inv_006', 'dealer_001', 'INV-2025-0048', 'Pro-forma Invoice', 'KARIBU HARDWARE',
    new Date('2025-03-03'), 'unpaid',
    [
      { description: 'Nyati Premium OPC — 25 MT', quantity: 25, unitPrice: 205_000, total: 5_125_000 },
    ]
  ),

  // ── dealer_002 ──────────────────────────────────────────────────────────────
  makeInvoice(
    'inv_007', 'dealer_002', 'INV-2024-0044', 'Tax Invoice', 'MWANGA BUILDING SUPPLIES',
    new Date('2024-11-12'), 'paid',
    [
      { description: 'Nyati Super 42.5 — 25 MT', quantity: 25, unitPrice: 195_000, total: 4_875_000 },
    ]
  ),
  makeInvoice(
    'inv_008', 'dealer_002', 'INV-2025-0019', 'Tax Invoice', 'MWANGA BUILDING SUPPLIES',
    new Date('2025-01-30'), 'unpaid',
    [
      { description: 'Nyati Max 32.5 — 35 MT', quantity: 35, unitPrice: 185_000, total: 6_475_000 },
    ]
  ),

  // ── dealer_003 ──────────────────────────────────────────────────────────────
  makeInvoice(
    'inv_009', 'dealer_003', 'INV-2024-0051', 'Tax Invoice', 'SIMBA CEMENT TRADERS',
    new Date('2024-12-01'), 'paid',
    [
      { description: 'Nyati Super 42.5 — 20 MT', quantity: 20, unitPrice: 195_000, total: 3_900_000 },
    ]
  ),
  makeInvoice(
    'inv_010', 'dealer_003', 'INV-2025-0027', 'Tax Invoice', 'SIMBA CEMENT TRADERS',
    new Date('2025-02-08'), 'unpaid',
    [
      { description: 'Nyati Duramax 42.5 — 18 MT', quantity: 18, unitPrice: 198_000, total: 3_564_000 },
    ]
  ),
]

export function getInvoicesByDealer(
  dealerId: string,
  filters?: { from?: string; to?: string; q?: string }
): Invoice[] {
  let results = mockInvoices.filter((inv) => inv.dealerId === dealerId)

  if (filters?.from) {
    const from = new Date(filters.from)
    results = results.filter((inv) => inv.billDate >= from)
  }
  if (filters?.to) {
    const to = new Date(filters.to)
    to.setHours(23, 59, 59, 999)
    results = results.filter((inv) => inv.billDate <= to)
  }
  if (filters?.q) {
    const q = filters.q.toLowerCase()
    results = results.filter((inv) => inv.invoiceNumber.toLowerCase().includes(q))
  }

  return results.sort((a, b) => b.billDate.getTime() - a.billDate.getTime())
}

export function getInvoiceById(id: string, dealerId: string): Invoice | undefined {
  return mockInvoices.find((inv) => inv.id === id && inv.dealerId === dealerId)
}
