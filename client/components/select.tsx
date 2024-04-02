'use client'

import type { FC } from 'react'

import { mr } from '@/lib/mr'

type ComponentProps = {
  label?: string
  required?: boolean
  errorMessages?: string
  selectedValue: string
  data: { label: string; value: string }[]
}

export const Select: FC<ComponentProps & Record<string, any>> = ({
  label,
  required = false,
  selectedValue,
  data,
  errorMessages,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <div className='block text-sm mb-1 dark:text-white'>
          <span>{label}</span>
          {required && <span className='ml-1 text-red-500'>*</span>}
        </div>
      )}
      <div className='relative'>
        <select
          className={mr(
            'py-3 px-4 rounded-lg pe-9 w-full border-gray-200 shadow-sm -mt-px -ms-px sm:mt-0 sm:first:ms-0 text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600',
            errorMessages
              ? 'border-red-500 focus:border-red-600 focus:ring-red-600'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
          )}
          {...rest}>
          {data.map((el, index: number) => (
            <option key={index} value={el.value} selected={el.value === selectedValue}>
              {el.label}
            </option>
          ))}
        </select>
      </div>
      {errorMessages && <p className=' text-xs text-red-600 mt-2'>{errorMessages}</p>}
    </div>
  )
}
