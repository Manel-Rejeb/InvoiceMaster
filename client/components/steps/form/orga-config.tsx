'use client'

import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'

import { Input } from '@/ui/input/input'
import { Select } from '@/ui/select/select'

import { COUNTIRES_PHONE_CODE } from '@/constants/countries-code'

export const OrgaConfig: FC = () => {
  const [selectPhone, setSelectedPhone] = useState('+216')

  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Let's get started</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Let's get going with the organization details.</p>
      </div>

      <div className='flex flex-col gap-8'>
        <Input required type='text' label='Company name' placeholder='Enter company name' />
        <Input required type='email' label='Email address' placeholder='Enter your company email' />

        <div className='flex items-start'>
          <Select
            required
            selectedValue='+216'
            label='Phone Number'
            data={COUNTIRES_PHONE_CODE}
            style={{ borderStartEndRadius: 0, borderEndEndRadius: 0, borderRight: 0 }}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedPhone(e.target.value)}
          />
          <Input
            type='text'
            label={'‎'} // this is an invisble character
            placeholder={`(${selectPhone}) 497-13-58`}
            style={{ borderStartStartRadius: 0, borderEndStartRadius: 0 }}
          />
        </div>

        <Input type='text' label='Tax number' placeholder='Enter tax number' />
        <Input type='text' label='Phone number' placeholder='Enter phone number' />
        <Input type='text' label='Phone number' placeholder='Enter phone number' />
        <Input type='text' label='Phone number' placeholder='Enter phone number' />
      </div>
    </div>
  )
}
