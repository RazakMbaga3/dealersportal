'use server'

import { SignJWT, jwtVerify } from 'jose'
import { hash } from 'bcryptjs'
import { generateOtp, saveOtp, verifyOtp } from '@/lib/otp'
import { sendSms } from '@/lib/africastalking'
import { findUserByIdentifier } from '@/lib/mock/dealers'
import { sendPasswordResetEmail } from '@/lib/emailTemplates'

// ─── Types ────────────────────────────────────────────────────────────────────

export type OtpRequestState = {
  error?: string
  identifier?: string
  success?: boolean
}

export type OtpVerifyState = {
  error?: string
  identifier?: string
  resetToken?: string
  success?: boolean
}

export type ResetPasswordState = {
  error?: string
  success?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getResetSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET env var is not set')
  return new TextEncoder().encode('reset:' + secret)
}

async function signResetToken(identifier: string): Promise<string> {
  return new SignJWT({ identifier, purpose: 'password-reset' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(getResetSecret())
}

async function verifyResetToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getResetSecret(), { algorithms: ['HS256'] })
    if (payload.purpose !== 'password-reset') return null
    return payload.identifier as string
  } catch {
    return null
  }
}

// ─── Step 1: Request OTP ──────────────────────────────────────────────────────

export async function requestOtp(
  _prev: OtpRequestState,
  formData: FormData
): Promise<OtpRequestState> {
  const identifier = (formData.get('identifier') as string | null)?.trim() ?? ''

  if (!identifier) {
    return { error: 'Please enter your phone number or email.' }
  }

  const user = findUserByIdentifier(identifier)
  if (!user) {
    // Don't reveal whether identifier exists — still succeed silently
    return { success: true, identifier }
  }

  const code = generateOtp()
  await saveOtp(identifier, code)

  // Send via SMS if phone, else email
  const isPhone = identifier.startsWith('+') || /^\d{10,}$/.test(identifier)
  if (isPhone && user.phone) {
    try {
      await sendSms(user.phone, `Your Nyati Portal reset code is: ${code}. Valid for 10 minutes.`)
    } catch (err) {
      console.error('[AT SMS error]', err)
      // Fall through to email
      if (user.email) {
        await sendPasswordResetEmail(user.email, user.name, code)
      }
    }
  } else if (user.email) {
    await sendPasswordResetEmail(user.email, user.name, code)
  }

  return { success: true, identifier }
}

// ─── Step 2: Verify OTP ───────────────────────────────────────────────────────

export async function verifyOtpCode(
  _prev: OtpVerifyState,
  formData: FormData
): Promise<OtpVerifyState> {
  const identifier = (formData.get('identifier') as string | null)?.trim() ?? ''
  const code = (formData.get('code') as string | null)?.trim() ?? ''

  if (!code || code.length !== 6) {
    return { error: 'Please enter the 6-digit code.', identifier }
  }

  const valid = await verifyOtp(identifier, code)
  if (!valid) {
    return { error: 'Invalid or expired code. Please try again.', identifier }
  }

  const resetToken = await signResetToken(identifier)
  return { success: true, identifier, resetToken }
}

// ─── Step 3: Reset Password ───────────────────────────────────────────────────

export async function resetPassword(
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const resetToken = (formData.get('resetToken') as string | null) ?? ''
  const password = (formData.get('password') as string | null) ?? ''
  const confirm = (formData.get('confirm') as string | null) ?? ''

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }
  if (password !== confirm) {
    return { error: 'Passwords do not match.' }
  }

  const identifier = await verifyResetToken(resetToken)
  if (!identifier) {
    return { error: 'Reset session expired. Please start over.' }
  }

  // In Phase 4 the user store is still mock — we log the intent and
  // return success. When mock is replaced with Prisma, swap this block:
  //   const user = findUserByIdentifier(identifier)
  //   await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hash(password, 10) } })
  const newHash = await hash(password, 10)
  console.info(`[resetPassword] would update hash for ${identifier} → ${newHash.slice(0, 20)}…`)

  return { success: true }
}
