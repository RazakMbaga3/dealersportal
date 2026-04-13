import Image from 'next/image'
import BrandStripe from './BrandStripe'

interface BrandHeaderProps {
  compact?: boolean
}

export default function BrandHeader({ compact = false }: BrandHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className={`mx-auto max-w-5xl px-6 ${compact ? 'py-3' : 'py-5'} flex items-center gap-4`}>
        <Image
          src="/assets/logo.jpg"
          alt="Nyati Cement"
          width={compact ? 48 : 60}
          height={compact ? 48 : 60}
          className="rounded-xl shrink-0"
          priority
        />
        <div className="flex flex-col justify-center gap-1">
          <Image
            src="/assets/lake-cement-ltd.png"
            alt="Lake Cement Ltd"
            width={compact ? 110 : 130}
            height={16}
            className="opacity-60"
          />
          {!compact && (
            <span className="text-xs text-gray-400 tracking-wide font-body">
              Hushika Haraka Hudumu Zaidi
            </span>
          )}
        </div>
      </div>
      <BrandStripe />
    </header>
  )
}
