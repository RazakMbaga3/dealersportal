import { prisma } from '@/lib/db'

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function saveOtp(identifier: string, code: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  // Invalidate any existing unused OTPs for this identifier
  await prisma.otpToken.updateMany({
    where: { identifier, used: false },
    data: { used: true },
  })

  await prisma.otpToken.create({
    data: { identifier, code, expiresAt },
  })
}

export async function verifyOtp(identifier: string, code: string): Promise<boolean> {
  const token = await prisma.otpToken.findFirst({
    where: {
      identifier,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!token) return false

  await prisma.otpToken.update({
    where: { id: token.id },
    data: { used: true },
  })

  return true
}
