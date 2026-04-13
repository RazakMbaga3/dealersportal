import { z } from 'zod'

export const CEMENT_TYPES = [
  'Nyati Super 42.5',
  'Nyati Duramax 42.5',
  'Nyati Premium OPC',
  'Nyati Max 32.5',
] as const

export const DELIVERY_PRIORITIES = ['standard', 'urgent'] as const

export const portalOrderProductSchema = z.object({
  cementType: z.enum(CEMENT_TYPES, { error: 'Select a cement type' }),
  quantityMT: z.coerce.number({ error: 'Enter quantity' }).positive('Must be greater than 0'),
  pricePerMT: z.coerce.number().positive().default(195_000),
})

export const portalOrderSchema = z.object({
  products: z.array(portalOrderProductSchema).min(1, 'Add at least one product'),
  retailerName: z.string().trim().optional(),
  deliveryAddress: z.string().min(5, 'Enter a delivery address'),
  deliveryPriority: z.enum(DELIVERY_PRIORITIES).default('standard'),
  notes: z.string().trim().optional(),
})

export type PortalOrderFormData = z.infer<typeof portalOrderSchema>
