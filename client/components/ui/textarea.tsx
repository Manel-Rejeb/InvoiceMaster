import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  errorMessage?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, required = false, errorMessage, ...props }, ref) => {
    return (
      <div className='flex-1 w-full'>
        {label && (
          <label htmlFor={label} className='block text-sm mb-1 dark:text-white'>
            <span>{label}</span>
            {required && <span className='ml-1 text-red-500'>*</span>}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className=' text-xs text-red-600 mt-2'>{errorMessage}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
