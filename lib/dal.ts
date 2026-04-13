import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/lib/session'
import type { SessionPayload } from '@/types'

const COOKIE_NAME = 'nyati-session'

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const session = await decrypt(token)
  if (!session?.userId) {
    redirect('/login')
  }
  return session
})
