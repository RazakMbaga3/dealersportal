import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue)]/90 focus-visible:ring-[var(--color-brand-blue)]',
  secondary:
    'bg-[var(--color-brand-orange)] text-white hover:bg-[var(--color-brand-orange)]/90 focus-visible:ring-[var(--color-brand-orange)]',
  ghost:
    'bg-transparent text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/10 focus-visible:ring-[var(--color-brand-blue)]',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold font-body transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
})

export default Button
