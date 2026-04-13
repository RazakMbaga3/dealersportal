'use server'

import { redirect } from 'next/navigation'
import { compare } from 'bcryptjs'
import { loginSchema } from '@/lib/schemas/auth'
import { createSession, deleteSession } from '@/lib/session'
import { findUserByIdentifier } from '@/lib/mock/dealers'

export interface LoginState {
  errors?: {
    identifier?: string[]
    password?: string[]
    _form?: string[]
  }
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const raw = {
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { identifier, password } = parsed.data

  const user = findUserByIdentifier(identifier)
  if (!user) {
    return { errors: { _form: ['Invalid credentials. Please try again.'] } }
  }

  const passwordMatch = await compare(password, user.passwordHash)
  if (!passwordMatch) {
    return { errors: { _form: ['Invalid credentials. Please try again.'] } }
  }

  await createSession(user.id, user.dealerId, user.role)
  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  await deleteSession()
  redirect('/login')
}
