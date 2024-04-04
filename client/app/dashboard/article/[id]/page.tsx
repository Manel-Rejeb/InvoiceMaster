'use client'

import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import { UNITS } from '@/constants/article-unit'
import { TAX_VALUES } from '@/constants/tax-value'
import { CURRENCIES } from '@/constants/currency-values'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  return (
    <div className='w-full h-full p-6'>
      <div className='flex flex-col gap-4 mb-6'>
        <div className='flex gap-4'>
          <div className='flex-1 flex flex-col gap-4'>
            <Input label='Article Name' required />
            <SelectDropDown
              label='Article type'
              data={[
                { label: 'Product', value: 'true' },
                { label: 'Service', value: 'false' },
              ]}
            />
            <SelectDropDown label='Article Unit' data={UNITS} required />
          </div>
          <div className='flex-1'>
            <File label='‎' />
          </div>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          <div className='flex col-span-2'>
            <Input type='number' label='Article Price' required />
          </div>
          <div className='flex col-span-1'>
            <SelectDropDown
              label='Base Currency'
              data={CURRENCIES.map((el) => ({ ...el, label: `${el.value} - ${el.label}` }))}
              required
            />
          </div>
          <div className='flex col-span-1'>
            <SelectDropDown
              label='Article Tax'
              data={TAX_VALUES.map((el) => ({ ...el, label: `${el.value} - ${el.label}` }))}
            />
          </div>
        </div>
        <Textarea label='Article Description' rows={6} />
      </div>
      <div className='w-full flex items-center gap-4 justify-end'>
        <Button variant={'destructive'} size={'lg'}>
          Cancel
        </Button>
        <Button size={'lg'}>{params.id === 'new' ? 'Create New' : 'Update Article'}</Button>
      </div>
    </div>
  )
}

/**

  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  PROJECT = 'PROJECT',
  QUANTITY = 'QUANTITY',

 */
