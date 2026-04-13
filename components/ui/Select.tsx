import { SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error = false, className = '', children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={[
        'w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 bg-white',
        'transition-colors font-body appearance-none',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]/40 focus:border-[var(--color-brand-blue)]',
        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
        error
          ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
          : 'border-gray-300',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </select>
  )
})

export default Select
