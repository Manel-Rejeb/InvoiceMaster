'use client'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

import { File } from '@/components/file'
import { Select } from '@/components/select'
import { Input } from '@/components/ui/input'

export const TYPE_OPTIONS: { label: string; value: string }[] = [
  { label: 'Service', value: 'service' },
  { label: 'Product', value: 'product' },
]
export default function Page() {
  const [selectType, setSelectedType] = useState()
  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Add new item</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>add new item details.</p>
      </div>

      <div className='flex flex-col gap-8'>
        <div className='flex gap-8'>
          <div className='flex flex-1 flex-col gap-8'>
            <Input required type='Add item name' label='Add item Name' placeholder='Item name' />

            <div className='flex items-start'>
              <Select
                selectedValue=''
                required
                label='Add Type'
                data={TYPE_OPTIONS}
                style={{ borderStartEndRadius: 0, borderEndEndRadius: 0, borderRight: 0 }}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
              />
              <Input
                type='text'
                label={'‎'} // this is an invisble character
                placeholder={`(${selectType})`}
                style={{ borderStartStartRadius: 0, borderEndStartRadius: 0 }}
              />
            </div>
          </div>

          <div className='flex-1'>
            <File label='Upload logo' required />
          </div>
        </div>
      </div>
    </div>
  )
}
