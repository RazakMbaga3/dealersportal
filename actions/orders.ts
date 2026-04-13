'use server'

import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/dal'
import { getDealerById } from '@/lib/mock/dealers'
import { portalOrderSchema, CEMENT_TYPES } from '@/lib/schemas/order-portal'
import { sendMail } from '@/lib/mailer'
import { dealerOrderEmail } from '@/lib/emailTemplates'

export interface OrderActionState {
  errors?: Record<string, string[]>
  message?: string
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(10000 + Math.random() * 90000)
  return `NYT-${year}-${rand}`
}

export async function createPortalOrder(
  prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const session = await verifySession()
  const dealer = getDealerById(session.dealerId)
  if (!dealer) return { message: 'Dealer account not found.' }

  // Parse products from form (multi-row: products[0][cementType], etc.)
  const products: unknown[] = []
  let i = 0
  while (formData.has(`products[${i}][cementType]`)) {
    products.push({
      cementType: formData.get(`products[${i}][cementType]`),
      quantityMT: formData.get(`products[${i}][quantityMT]`),
      pricePerMT: 195_000, // default; Phase 4 will pull from pricing table
    })
    i++
  }

  const raw = {
    products,
    retailerName: formData.get('retailerName') || undefined,
    deliveryAddress: formData.get('deliveryAddress'),
    deliveryPriority: formData.get('deliveryPriority'),
    notes: formData.get('notes') || undefined,
  }

  const parsed = portalOrderSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const data = parsed.data
  const orderNumber = generateOrderNumber()
  const totalAmountTZS = data.products.reduce(
    (sum, p) => sum + p.quantityMT * p.pricePerMT,
    0
  )

  // Send coordinator email
  try {
    const emailData = dealerOrderEmail({
      orderNumber,
      dealerName: dealer.companyName,
      region: dealer.region,
      products: data.products,
      deliveryAddress: data.deliveryAddress,
      deliveryPriority: data.deliveryPriority,
      retailerName: data.retailerName,
      notes: data.notes,
      totalAmountTZS,
    })
    await sendMail({ to: process.env.COORDINATOR_EMAIL!, ...emailData })
  } catch {
    // Email failure should not block the order
  }

  redirect(`/orders?placed=${orderNumber}`)
}
