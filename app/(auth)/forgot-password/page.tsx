'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import {
  requestOtp,
  verifyOtpCode,
  resetPassword,
  type OtpRequestState,
  type OtpVerifyState,
  type ResetPasswordState,
} from '@/actions/otp'

// ─── Step 1: Enter identifier ─────────────────────────────────────────────────

function RequestStep({ onSuccess }: { onSuccess: (identifier: string) => void }) {
  const [state, action, pending] = useActionState<OtpRequestState, FormData>(
    async (prev, formData) => {
      const result = await requestOtp(prev, formData)
      if (result.success && result.identifier) {
        onSuccess(result.identifier)
      }
      return result
    },
    {}
  )

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="identifier" required>
          Phone Number or Email
        </Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="+255700001001 or email@example.com"
          autoComplete="username"
        />
      </div>
      {state.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? 'Sending…' : 'Send Reset Code'}
      </Button>
    </form>
  )
}

// ─── Step 2: Enter OTP code ───────────────────────────────────────────────────

function VerifyStep({
  identifier,
  onSuccess,
  onBack,
}: {
  identifier: string
  onSuccess: (resetToken: string) => void
  onBack: () => void
}) {
  const [state, action, pending] = useActionState<OtpVerifyState, FormData>(
    async (prev, formData) => {
      const result = await verifyOtpCode(prev, formData)
      if (result.success && result.resetToken) {
        onSuccess(result.resetToken)
      }
      return result
    },
    { identifier }
  )

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="identifier" value={identifier} />
      <p className="text-sm text-gray-500 font-body">
        A 6-digit code was sent to <span className="font-semibold text-gray-800">{identifier}</span>.
        Enter it below.
      </p>
      <div>
        <Label htmlFor="code" required>
          Reset Code
        </Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          autoComplete="one-time-code"
          className="tracking-[0.4em] text-center text-lg font-display"
        />
      </div>
      {state.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? 'Verifying…' : 'Verify Code'}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-body mt-1"
      >
        ← Back
      </button>
    </form>
  )
}

// ─── Step 3: New password ─────────────────────────────────────────────────────

function ResetStep({
  resetToken,
  onSuccess,
}: {
  resetToken: string
  onSuccess: () => void
}) {
  const [state, action, pending] = useActionState<ResetPasswordState, FormData>(
    async (prev, formData) => {
      const result = await resetPassword(prev, formData)
      if (result.success) onSuccess()
      return result
    },
    {}
  )

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="resetToken" value={resetToken} />
      <div>
        <Label htmlFor="password" required>
          New Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
      </div>
      <div>
        <Label htmlFor="confirm" required>
          Confirm Password
        </Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="Repeat your new password"
          autoComplete="new-password"
        />
      </div>
      {state.error && (
        <p className="text-sm text-red-600 font-body">{state.error}</p>
      )}
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? 'Saving…' : 'Set New Password'}
      </Button>
    </form>
  )
}

// ─── Done ─────────────────────────────────────────────────────────────────────

function DoneStep() {
  return (
    <div className="text-center space-y-3">
      <div className="text-4xl">✓</div>
      <p className="text-base font-semibold text-(--color-brand-blue) font-display">
        Password updated!
      </p>
      <p className="text-sm text-gray-500 font-body">
        You can now sign in with your new password.
      </p>
      <Link
        href="/login"
        className="inline-block mt-2 text-sm font-semibold text-(--color-brand-blue) hover:underline font-body"
      >
        Go to Sign In →
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Step = 'request' | 'verify' | 'reset' | 'done'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('request')
  const [identifier, setIdentifier] = useState('')
  const [resetToken, setResetToken] = useState('')

  const titles: Record<Step, string> = {
    request: 'Reset Password',
    verify: 'Enter Code',
    reset: 'New Password',
    done: 'All Done',
  }

  const subtitles: Record<Step, string> = {
    request: "Enter your phone number or email and we'll send you a reset code.",
    verify: 'Check your phone or email for the code.',
    reset: 'Choose a new password for your account.',
    done: '',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Step indicator */}
      <div className="flex gap-1.5 mb-6">
        {(['request', 'verify', 'reset'] as const).map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              ['request', 'verify', 'reset', 'done'].indexOf(step) > i - 1
                ? 'bg-(--color-brand-blue)'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-(--color-brand-blue) font-display mb-1">
        {titles[step]}
      </h1>
      {subtitles[step] && (
        <p className="text-sm text-gray-500 mb-6 font-body">{subtitles[step]}</p>
      )}

      {step === 'request' && (
        <RequestStep
          onSuccess={(id) => {
            setIdentifier(id)
            setStep('verify')
          }}
        />
      )}
      {step === 'verify' && (
        <VerifyStep
          identifier={identifier}
          onSuccess={(token) => {
            setResetToken(token)
            setStep('reset')
          }}
          onBack={() => setStep('request')}
        />
      )}
      {step === 'reset' && (
        <ResetStep resetToken={resetToken} onSuccess={() => setStep('done')} />
      )}
      {step === 'done' && <DoneStep />}

      {step !== 'done' && (
        <p className="mt-6 text-center text-xs text-gray-500 font-body">
          <Link href="/login" className="text-(--color-brand-blue) hover:underline">
            Back to Sign In
          </Link>
        </p>
      )}
    </div>
  )
}
