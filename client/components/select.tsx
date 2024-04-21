'use client'

import type { FC } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { mr } from '@/lib/mr'

type ComponentProps = {
  label?: string
  required?: boolean
  errorMessages?: string
  data: { label: string; value: string }[]
  className?: string
}

export const SelectDropDown: FC<ComponentProps & Record<string, any>> = ({
  label,
  required = false,
  data,
  errorMessages,
  className = '',
  ...rest
}) => {
  return (
    <div className='flex-1 w-full'>
      {label && (
        <div className='block text-sm mb-1 dark:text-white'>
          <span>{label}</span>
          {required && <span className='ml-1 text-red-500'>*</span>}
        </div>
      )}
      <div className='relative'>
        <Select {...rest}>
          <SelectTrigger
            className={mr(
              'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
              errorMessages
                ? 'border-red-500 focus:border-red-600 focus:ring-red-600'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            )}>
            <SelectValue placeholder='Select your value' />
          </SelectTrigger>
          <SelectContent>
            {data.map((el, index: number) => (
              <SelectItem key={`${index}${el.value}`} value={el.value}>
                {el.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {errorMessages && <p className=' text-xs text-red-600 mt-2'>{errorMessages}</p>}
    </div>
  )
}
