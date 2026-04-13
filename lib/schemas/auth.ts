import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Phone number or email is required')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required'),
})

export type LoginFormData = z.infer<typeof loginSchema>
