'use client'

import { useRouter } from 'next/navigation'
import { useState, ChangeEvent, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import * as yup from 'yup'

import { COUNTRY_NAMES } from '@/constants/countries'
import { Label } from '@/components/ui/label'
import { Controller, useForm } from 'react-hook-form'
import { formIndividualValidation } from '../_actions/form-individual-valdiation'
import { yupResolver } from '@hookform/resolvers/yup'
import { FIND, PATCH, POST } from '../_actions/individual-action'

interface PageProps {
  searchParams: { id: string }
}

export default function page({ searchParams }: PageProps) {
  type IndividualForm = yup.InferType<typeof formIndividualValidation>
  const { push } = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(formIndividualValidation), defaultValues: { type_customer: false } })

  useEffect(() => {
    if (searchParams.id && searchParams.id !== 'new') {
      FIND(searchParams.id).then((res) => {
        reset({
          ...res,
        } as unknown as IndividualForm)
      })
    }
  }, [searchParams.id])

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          {searchParams.id && searchParams.id === 'new' && (
            <div className='flex items-center gap-4'>
              <Label htmlFor='individual'>Individual</Label>
              <Switch id='individual' onCheckedChange={() => push('/dashboard/customers/corporate?id=new')} />
              <Label htmlFor='corporate'>Corporate</Label>
            </div>
          )}
        </div>
        <Button variant={'destructive'} onClick={() => push('/dashboard/customers')}>
          Cancel
        </Button>
      </div>

      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6 '>
          <div className='flex flex-col gap-4 mb-5'>
            <div className='flex gap-8'>
              <Controller
                name='individual.first_name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='First name'
                    placeholder='first name'
                    errorMessage={errors?.individual?.first_name && errors.individual.first_name.message}
                  />
                )}
              />
              <Controller
                name='individual.last_name'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='Last name'
                    placeholder='last name'
                    errorMessage={errors?.individual?.last_name && errors.individual.last_name.message}
                  />
                )}
              />
            </div>
            <div className='flex gap-8'>
              <div className='flex flex-1 flex-col gap-8'>
                <Controller
                  name='customer_email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      type='email'
                      label='Email address'
                      placeholder='Enter email adress'
                      errorMessage={errors?.customer_email && errors.customer_email.message}
                    />
                  )}
                />

                <div className='flex items-start'>
                  <Controller
                    name='customer_number'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        required
                        type='number'
                        label='Phone number'
                        placeholder='Enter phone number'
                        errorMessage={errors?.customer_number && errors.customer_number.message}
                      />
                    )}
                  />
                </div>
              </div>

              <div className='flex-1'>
                <File label='Upload logo' required />
              </div>
            </div>

            <div className='flex gap-8'>
              <div className='flex-1'>
                <Controller
                  name='customer_address'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      type='text'
                      label='Address'
                      placeholder='Address'
                      errorMessage={errors?.customer_address && errors.customer_address.message}
                    />
                  )}
                />
              </div>
              <Controller
                name='customer_city'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='City'
                    placeholder='City'
                    errorMessage={errors?.customer_city && errors.customer_city.message}
                  />
                )}
              />
            </div>
            <div className='flex gap-8'>
              <Controller
                name='customer_zip'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='Corporate post code'
                    placeholder='post code'
                    errorMessage={errors?.customer_zip && errors.customer_zip.message}
                  />
                )}
              />

              <Controller
                name='customer_country'
                control={control}
                render={({ field }) => (
                  <SelectDropDown
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                    required
                    label='Country'
                    placeholder='Select country'
                    data={COUNTRY_NAMES.map((el) => ({ ...el, label: `${el.value} - ${el.label}` }))}
                    errorMessage={errors?.customer_country && errors.customer_country.message}
                  />
                )}
              />
              <Controller
                name='customer_reference'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='InvoiceID'
                    placeholder='Corporate reference'
                    errorMessage={errors?.customer_reference && errors.customer_reference.message}
                  />
                )}
              />
            </div>
          </div>
          <div className='w-full flex items-center gap-4 justify-end mt-8'>
            {!searchParams.id && searchParams.id === 'new' ? (
              <Button
                type='submit'
                onClick={handleSubmit(
                  (data: IndividualForm) => {
                    POST(data).then((res) => push('/dashboard/customers'))
                  },
                  (error) => {
                    console.log(error)
                  }
                )}>
                Create New
              </Button>
            ) : (
              <Button
                type='submit'
                onClick={handleSubmit((data: IndividualForm) => {
                  PATCH(searchParams.id, data).then((res) => push('/dashboard/customers'))
                })}>
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
