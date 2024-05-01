'use client'

import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { SelectDropDown } from '@/components/select'
import { File } from '@/components/file'

import * as yup from 'yup'

import { INDUSTRIES_BUSINESS } from '@/constants/industry'
import { COUNTRY_NAMES } from '@/constants/countries'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { orgaConfigValidation } from '@/app/organization-config/_actions/form-orga-validation'
import { Button } from '@/components/ui/button'
import { POST } from '@/app/organization-config/_actions/server-action'
import { useRouter } from 'next/navigation'

export const OrgaConfig: FC = () => {
  type OrganizationForm = yup.InferType<typeof orgaConfigValidation>
  const { push } = useRouter()

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(orgaConfigValidation),
  })

  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Let's get started</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Let's get going with the organization details.</p>
      </div>

      <div className='flex flex-col gap-8'>
        <Controller
          name='organization_name'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              required
              type='text'
              label='Company name'
              placeholder='Company name'
              errorMessage={errors?.organization_name && errors.organization_name.message}
            />
          )}
        />

        <div className='flex gap-8'>
          <div className='flex flex-1 flex-col gap-8'>
            <Controller
              name='organization_email'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  required
                  type='email'
                  label='Email address'
                  placeholder='Company email'
                  errorMessage={errors?.organization_email && errors.organization_email.message}
                />
              )}
            />
            <div className='flex items-start'>
              <Controller
                name='organization_phone'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    type='number'
                    label='Phone number'
                    placeholder='Company phone number'
                    errorMessage={errors?.organization_phone && errors.organization_phone.message}
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
            name='organization_tax_number'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                type='text'
                label='TNI'
                placeholder='Enter tax number identification'
                errorMessage={errors?.organization_tax_number && errors.organization_tax_number.message}
              />
            )}
          />

          <div className='flex-1'>
            <Controller
              name='organization_industry'
              control={control}
              render={({ field }) => (
                <SelectDropDown
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  label='Business industry'
                  data={INDUSTRIES_BUSINESS}
                />
              )}
            />
          </div>
        </div>

        <div className='flex gap-8'>
          <Controller
            name='organization_address'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                type='text'
                label='Company address'
                placeholder='Company address'
                errorMessage={errors?.organization_address && errors.organization_address.message}
              />
            )}
          />
          <Controller
            name='organization_country'
            control={control}
            render={({ field }) => (
              <SelectDropDown
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
                required
                selectedValue='Tunisia'
                label='Country'
                data={COUNTRY_NAMES}
                errorMessages={errors?.organization_country && errors.organization_country.message}
              />
            )}
          />
        </div>

        <div className='flex gap-8'>
          <Controller
            name='organization_state'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                label='State'
                placeholder='Your state'
                errorMessage={errors?.organization_state && errors.organization_state.message}
              />
            )}
          />
          <Controller
            name='organization_zip'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                required
                type='text'
                label='Post code'
                placeholder='Your post code'
                errorMessage={errors?.organization_zip && errors.organization_zip.message}
              />
            )}
          />
        </div>
      </div>

      <div className='flex items-center justify-end'>
        <Button
          type='submit'
          onClick={handleSubmit(
            (data: OrganizationForm) => {
              POST(data).then((res) => push('/organization-config?step=2'))
            },
            (error) => {
              console.log(error)
            }
          )}>
          create organization
        </Button>

        {/* <Link
          passHref
          href={`/organization-config?step=2`}
          className=' capitalize py-3 px-7 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          create organization
        </Link> */}
      </div>
    </div>
  )
}
