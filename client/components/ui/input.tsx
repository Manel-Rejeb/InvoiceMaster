import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required = false, errorMessage, ...props }, ref) => {
    return (
      <div className='flex-1 w-full'>
        {label && (
          <label htmlFor={type} className='block text-sm mb-1 dark:text-white'>
            <span>{label}</span>
            {required && <span className='ml-1 text-red-500'>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            errorMessage
              ? 'border border-red-500 focus:border-red-600 focus:ring-red-600'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500',
            className
          )}
          autoComplete={'no'}
          {...props}
        />
        {errorMessage && <p className=' text-xs text-red-600 mt-2'>{errorMessage}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
