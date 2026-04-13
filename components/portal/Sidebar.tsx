'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { logout } from '@/actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/orders/new', label: 'New Order', icon: PlusIcon },
  { href: '/orders', label: 'Sales Orders', icon: CartIcon },
  { href: '/invoices', label: 'Invoices', icon: DocumentIcon },
  { href: '/performance', label: 'Performance', icon: ChartIcon },
  { href: '/profile', label: 'My Profile', icon: UserIcon },
]

interface SidebarProps {
  companyName: string
}

export default function Sidebar({ companyName }: SidebarProps) {
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      await logout()
    })
  }

  function isActive(href: string) {
    if (href === '/orders/new') return pathname === '/orders/new'
    if (href === '/orders') return pathname === '/orders' || (pathname.startsWith('/orders/') && pathname !== '/orders/new')
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="flex flex-col h-full bg-[var(--color-brand-blue)] text-white w-60 shrink-0">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center gap-3">
        <Image
          src="/assets/logo.jpg"
          alt="Nyati Cement"
          width={44}
          height={44}
          className="rounded-lg shrink-0"
          priority
        />
        <div className="min-w-0">
          <Image
            src="/assets/lake-cement-ltd-white.png"
            alt="Lake Cement Ltd"
            width={110}
            height={14}
            className="opacity-60"
          />
          <p className="text-[10px] text-white/40 mt-0.5 font-body">Dealer Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium font-body transition-colors',
                active
                  ? 'bg-[var(--color-brand-orange)]/20 text-[var(--color-brand-orange)]'
                  : 'text-white/70 hover:text-white hover:bg-white/10',
              ].join(' ')}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Dealer + Logout */}
      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-xs font-semibold text-white truncate font-body">
          {companyName}
        </p>
        <button
          onClick={handleLogout}
          disabled={pending}
          className="mt-2 flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors disabled:opacity-50 font-body"
        >
          <LogoutIcon className="h-3.5 w-3.5" />
          {pending ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </aside>
  )
}

// Inline SVG icon components

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
  )
}
