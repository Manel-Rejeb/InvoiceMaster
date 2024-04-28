'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import { UNITS } from '@/constants/article-unit'
import { TAX_VALUES } from '@/constants/tax-value'
import { CURRENCIES } from '@/constants/currency-values'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { formCoroprateValidation } from '@/app/dashboard/customers/_actions/form-corporate-validation'
import { POST, PATCH } from '@/app/dashboard/customers/_actions/corporate-actions'
import { FIND } from '../../article/_actions/server-action'
import { INDUSTRIES_BUSINESS } from '@/constants/industry'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  type CorporateForm = yup.InferType<typeof formCoroprateValidation>

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <Switch>corportate</Switch>
        </div>
        <Button variant={'destructive'}>Cancel</Button>
      </div>

      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6'>
          <div className='flex flex-col gap-4 mb-6'>
            <div className='flex gap-4'>
              <Input label='Company name' />
            </div>
            <div className='flex gap-4'>
              <SelectDropDown
                label='Industry'
                required
                data={INDUSTRIES_BUSINESS.map((el, index) => ({ ...el, label: `${el.value}-${el.label}`, key: index }))}
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
