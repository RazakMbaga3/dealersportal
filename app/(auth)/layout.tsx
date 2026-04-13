import BrandStripe from '@/components/brand/BrandStripe'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Auth header — centered brand */}
      <header className="bg-white shadow-sm">
        <div className="flex flex-col items-center py-6 gap-2">
          <Image
            src="/assets/logo.jpg"
            alt="Nyati Cement"
            width={72}
            height={72}
            className="rounded-xl"
            priority
          />
          <Image
            src="/assets/lake-cement-ltd.png"
            alt="Lake Cement Ltd"
            width={140}
            height={20}
            className="mt-1 opacity-70"
          />
        </div>
        <BrandStripe />
      </header>

      {/* Card centered on page */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <BrandStripe />
        <p className="py-3 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Lake Cement Ltd
        </p>
      </footer>
    </div>
  )
}
