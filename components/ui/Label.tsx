import { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export default function Label({ required = false, className = '', children, ...props }: LabelProps) {
  return (
    <label
      className={[
        'block text-sm font-semibold text-gray-700 font-body mb-1',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
}
