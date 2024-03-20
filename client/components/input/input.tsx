'use client'

import type { FC, HTMLInputTypeAttribute } from 'react'
import { mr } from '@/lib/mr'

type ComponentProps = {
  type: HTMLInputTypeAttribute
  label?: string
  placeholder?: string
  required?: boolean
  autoComplete?: 'off' | 'on' | 'current-password' | 'new-password'
  errorMessages?: string
}

export const Input: FC<ComponentProps & Record<string, any>> = ({
  type = 'text',
  label,
  placeholder,
  required = false,
  autoComplete = 'off',
  errorMessages,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={type} className='block text-sm mb-2 dark:text-white'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          type={type}
          id={type}
          name={type}
          className={mr(
            'py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600',
            errorMessages
              ? 'border-red-500 focus:border-red-600 focus:ring-red-600'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
          )}
          {...rest}
        />
      </div>
      {errorMessages && <p className=' text-xs text-red-600 mt-2'>{errorMessages}</p>}
    </div>
  )
}
