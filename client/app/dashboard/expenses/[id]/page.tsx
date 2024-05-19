'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import { UNITS } from '@/constants/article-unit'
import { TAX_VALUES } from '@/constants/tax-value'
import { CURRENCIES } from '@/constants/currency-values'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { expenseFormValidation } from '../_actions/form-expense-validation'
import { FIND, POST, PATCH } from '../_actions/server-action'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  type ExpenseForm = yup.InferType<typeof expenseFormValidation>

  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(expenseFormValidation),
  })

  useEffect(() => {
    if (params.id !== 'new') {
      FIND(params.id)
        .then((res) =>
          reset({
            ...res,
            expense_type: res.expense_type ? 'true' : 'false',
            expense_tax: `${res.expense_tax}%`,
            expense_picture: '',
          } as unknown as ExpenseForm)
        )
        .then(() => setLoading(false))
    }
  }, [params.id])

  if (loading && params.id != 'new') return <div>Loading...</div>

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Expenses</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of expenses that you provide as article expense.</p>
        </div>

        <Button variant='destructive' onClick={() => push('/dashboard/expenses')}>
          Cancel
        </Button>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6'>
          <div className='flex flex-col gap-4 mb-6'>
            <div className='flex gap-4'>
              <div className='flex-1 flex flex-col gap-4'>
                <Controller
                  name='expense_name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      label='Expense Name'
                      errorMessage={errors?.expense_name && errors.expense_name.message}
                    />
                  )}
                />

                <div className='flex-1'>
                  <Controller
                    name='expense_picture'
                    control={control}
                    render={({ field }) => (
                      <File
                        {...field}
                        label='Article Picture'
                        errorMessage={errors?.expense_picture && errors.expense_picture.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  name='expense_description'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label='Description'
                      rows={6}
                      errorMessage={errors?.expense_description && errors.expense_description.message}
                    />
                  )}
                />

                <div className='flex gap-4'>
                  <Controller
                    name='expense_buy_price'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        type='number'
                        label='Buy Price'
                        errorMessage={errors?.expense_buy_price && errors.expense_buy_price.message}
                      />
                    )}
                  />

                  <Controller
                    name='expense_sell_price'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        type='number'
                        label='Sell Price'
                        errorMessage={errors?.expense_sell_price && errors.expense_sell_price.message}
                      />
                    )}
                  />

                  <Controller
                    name='expense_tax'
                    control={control}
                    render={({ field }) => (
                      <SelectDropDown
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        label='Tax'
                        data={TAX_VALUES}
                        required
                        errorMessage={errors?.expense_tax && errors.expense_tax.message}
                      />
                    )}
                  />

                  <Controller
                    name='expense_unit'
                    control={control}
                    render={({ field }) => (
                      <SelectDropDown
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        label='Unit'
                        data={UNITS}
                        required
                        errorMessage={errors?.expense_unit && errors.expense_unit.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
