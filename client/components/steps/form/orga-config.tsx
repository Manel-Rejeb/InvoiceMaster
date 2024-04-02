'use client'

import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Select } from '@/components/select'
import { File } from '@/components/file'

import { COUNTIRES_PHONE_CODE } from '@/constants/countries-code'
import { INDUSTRIES_BUSINESS } from '@/constants/industry'
import { COUNTRY_NAMES } from '@/constants/countries'

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

        <div className='flex gap-8'>
          <div className='flex flex-1 flex-col gap-8'>
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
          </div>

          <div className='flex-1'>
            <File label='Upload logo' required />
          </div>
        </div>

        <div className='flex gap-8'>
          <Input required type='text' label='TNI' placeholder='Enter tax number identification' />
          <div className='flex-1'>
            <Select required selectedValue='' label='Business industry' data={INDUSTRIES_BUSINESS} />
          </div>
        </div>

        <Input required type='text' label='Company address' placeholder='Company address' />

        <div className='flex gap-8'>
          <div className='flex-1'>
            <Select required selectedValue='Tunisia' label='Country' data={COUNTRY_NAMES} />
          </div>
          <Input type='text' label='State' placeholder='Your state' />
        </div>

        <div className='flex gap-8'>
          <Input required type='text' label='Post code' placeholder='Your post code' />
          <Input required type='text' label='City' placeholder='Your city' />
        </div>
      </div>

      <div className='flex items-center justify-end'>
        <Link
          passHref
          href={`/organization-config?step=2`}
          className=' capitalize py-3 px-7 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          next step
        </Link>
      </div>
    </div>
  )
}
