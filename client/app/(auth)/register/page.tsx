'use client'
import Link from 'next/link'

import { Input } from '@/components/ui/input'

import { POST } from '@/app/(auth)/register/_actions/server-action'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerFormValisation } from './_actions/register-form-validation'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { push } = useRouter()
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(registerFormValisation) })

  return (
    <div className='w-full max-w-[400px]'>
      <div className='text-center'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Sign up</h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Let’s get started with 30 days free trial</p>
      </div>

      <div className='mt-8'>
        {/* <!-- Form --> */}
        <div className='grid gap-y-4'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='username'
                placeholder='Enter your username'
                autoComplete='no'
                errorMessage={errors?.username && errors.username.message}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='email'
                placeholder='Enter your email'
                autoComplete='no'
                errorMessage={errors?.email && errors.email.message}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='password'
                placeholder='Enter your password'
                autoComplete='new-password'
                errorMessage={errors?.password && errors.password.message}
              />
            )}
          />
        </div>

        <button
          type='submit'
          onClick={handleSubmit((data: UserRegisterType) =>
            POST(data).then((res) => {
              push('/organization-config')
            })
          )}
          className='mt-8 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          Sign up
        </button>

        {/* <!-- End Form --> */}
        <div className='text-center'>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Already have an Account?{' '}
            <Link
              passHref
              href='/login'
              className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
