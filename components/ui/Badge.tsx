import { HTMLAttributes } from 'react'

type BadgeVariant = 'blue' | 'orange' | 'green' | 'red' | 'gray'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  blue: 'bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]',
  orange: 'bg-[var(--color-brand-orange)]/15 text-[var(--color-brand-orange)]',
  green: 'bg-[var(--color-brand-green)]/15 text-[var(--color-brand-green)]',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
}

export default function Badge({ variant = 'gray', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-body',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
