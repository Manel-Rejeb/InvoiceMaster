'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import * as yup from 'yup'

import { formCoroprateValidation } from '@/app/dashboard/customers/_actions/form-corporate-validation'
import { INDUSTRIES_BUSINESS } from '@/constants/industry'
import { COUNTRY_NAMES } from '@/constants/countries'
import { Label } from '@/components/ui/label'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FIND, PATCH, POST } from '../_actions/corporate-actions'

interface PageProps {
  searchParams: { id: string }
}

export default function page({ searchParams }: PageProps) {
  type CorporateForm = yup.InferType<typeof formCoroprateValidation>

  const { push } = useRouter() //deconstruction

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(formCoroprateValidation),
    defaultValues: { type_customer: true },
  })
  useEffect(() => {
    if (searchParams.id && searchParams.id !== 'new') {
      FIND(searchParams.id).then((res) => {
        reset({
          ...res,
        } as unknown as CorporateForm)
      })
    }
  }, [searchParams.id])

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          {searchParams.id && searchParams.id === 'new' && (
            <div className='flex items-center gap-4'>
              <Label htmlFor='corporate'>Individual</Label>
              <Switch id='corporate' checked onCheckedChange={() => push('/dashboard/customers/individual?id=new')} />
              <Label htmlFor='corporate'> Corporate</Label>
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
            <Controller
              name='corporate.corporation_name'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  type='text'
                  label='Corporate name'
                  placeholder='Enter corporate name'
                  errorMessage={errors?.corporate?.corporation_name && errors.corporate.corporation_name.message}
                />
              )}
            />

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
                      label='Corporate email address'
                      placeholder='Enter corporate email'
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
                        label='Corporate phone number'
                        placeholder='(216) 497-13-58'
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
              <Controller
                name='corporate.tax_number'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='TNI'
                    placeholder='Enter tax number identification'
                    errorMessage={errors?.corporate?.tax_number && errors.corporate.tax_number.message}
                  />
                )}
              />

              <div className='flex-1'>
                <Controller
                  name='corporate.industry'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      {...field}
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label='Business industry'
                      data={INDUSTRIES_BUSINESS}
                      errorMessage={errors?.corporate?.industry && errors.corporate.industry.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex gap-8'>
              <Controller
                name='customer_address'
                control={control}
                render={({ field }) => (
                  <Input {...field} required type='text' label='Company address' placeholder='Company address' />
                )}
              />
              <Controller
                name='corporate.headquarter_address'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='Headquarter adress'
                    placeholder='Headquarter adress'
                    errorMessage=''
                  />
                )}
              />
            </div>

            <div className='flex gap-8'>
              <div className='flex-1'>
                <Controller
                  name='customer_country'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                      selectedValue='Tunisia'
                      label='Country'
                      data={COUNTRY_NAMES}
                    />
                  )}
                />
              </div>
              <Controller
                name='customer_city'
                control={control}
                render={({ field }) => <Input {...field} required type='text' label='City' placeholder='City' />}
              />
            </div>
            <div className='flex gap-8'>
              <Controller
                name='customer_zip'
                control={control}
                render={({ field }) => (
                  <Input {...field} required type='text' label='Corporate post code' placeholder=' post code' />
                )}
              />
              <Controller
                name='customer_reference'
                control={control}
                render={({ field }) => (
                  <Input {...field} required type='text' label='invoiceID' placeholder='Corporate invoive ID' />
                )}
              />
            </div>
            <div className='flex gap-8 mt-4 mb-4'>
              <h5>Contact Person</h5>
            </div>
            <div className='flex gap-8'>
              <Controller
                name='corporate.contact_person_first_name'
                control={control}
                render={({ field }) => (
                  <Input {...field} required type='text' label='First name' placeholder='first name' errorMessage='' />
                )}
              />
              <Controller
                name='corporate.contact_person_last_name'
                control={control}
                render={({ field }) => (
                  <Input {...field} required type='text' label='Last name' placeholder='last name' errorMessage='' />
                )}
              />
            </div>
            <div className='flex gap-8'>
              <Controller
                name='corporate.contact_person_email'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='email'
                    label=' email adress'
                    placeholder='email adress'
                    errorMessage={
                      errors?.corporate?.contact_person_email && errors.corporate.contact_person_email.message
                    }
                  />
                )}
              />
            </div>
            <div className='flex gap-8'>
              <div className='flex items-start'>
                <Controller
                  name='corporate.contact_person_phone_number'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      type='number'
                      label='Phone Number'
                      placeholder='(216) 497-13-58'
                      errorMessage={
                        errors?.corporate?.contact_person_phone_number &&
                        errors.corporate.contact_person_phone_number.message
                      }
                    />
                  )}
                />
              </div>
              <Controller
                name='corporate.contact_person_job_title'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='text'
                    label='Contact person job'
                    placeholder='position name'
                    errorMessage={
                      errors?.corporate?.contact_person_job_title && errors.corporate.contact_person_job_title.message
                    }
                  />
                )}
              />
            </div>
          </div>

          <div className='w-full flex items-center gap-4 justify-end mt-8'>
            {!searchParams.id || searchParams.id === 'new' ? (
              <Button
                type='submit'
                onClick={handleSubmit(
                  (data: CorporateForm) => {
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
                onClick={handleSubmit((data: CorporateForm) => {
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
