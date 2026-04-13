'use client'

import { usePathname } from 'next/navigation'

function getTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/orders/new') return 'New Order'
  if (pathname.startsWith('/orders')) return 'Sales Orders'
  if (pathname.startsWith('/invoices')) return 'Invoices'
  if (pathname.startsWith('/performance')) return 'Performance'
  if (pathname.startsWith('/profile/users')) return 'Users'
  if (pathname.startsWith('/profile')) return 'My Profile'
  return 'Portal'
}

interface TopBarProps {
  companyName: string
}

export default function TopBar({ companyName }: TopBarProps) {
  const pathname = usePathname()
  const title = getTitle(pathname)

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-bold text-[var(--color-brand-blue)] font-display">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-500 font-body">
          {companyName}
        </span>
        <button className="relative p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
      </div>
    </header>
  )
}
