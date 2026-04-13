'use client'

import { useActionState } from 'react'
import { login } from '@/actions/auth'
import type { LoginState } from '@/actions/auth'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Link from 'next/link'

const initialState: LoginState = {}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-2xl font-bold text-[var(--color-brand-blue)] font-display mb-1">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500 mb-6 font-body">
        Sign in to your dealer portal
      </p>

      {state.errors?._form && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          {state.errors._form.map((msg) => (
            <p key={msg} className="text-sm text-red-700 font-body">
              {msg}
            </p>
          ))}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="identifier" required>
            Phone Number or Email
          </Label>
          <Input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="+255700001001 or email@example.com"
            error={!!state.errors?.identifier}
          />
          {state.errors?.identifier && (
            <p className="mt-1 text-xs text-red-600 font-body">
              {state.errors.identifier[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={!!state.errors?.password}
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-600 font-body">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-[var(--color-brand-blue)] hover:underline font-body"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={pending}>
          {pending ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-500 font-body">
        Need access?{' '}
        <a
          href="mailto:projects@lakecement.co.tz"
          className="text-[var(--color-brand-blue)] hover:underline"
        >
          Contact Lake Cement
        </a>
      </p>
    </div>
  )
}
