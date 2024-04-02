'use client'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@/components/ui/input'
import { loginFormValidation } from '@/validation/login-form-validation'

const Page = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(loginFormValidation) })
  return (
    <div className='w-full max-w-[400px]'>
      <div className='text-center'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Sign in</h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          Enter you credentials to connect to your account.
        </p>
      </div>

      <div className='mt-8'>
        {/* <!-- Form --> */}
        <div className='grid gap-y-4'>
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
          <div className='flex flex-col'>
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
            <Link passHref href={'/forget-password'} className='w-full text-sm capitalize text-end text-blue-600'>
              forget password ?
            </Link>
          </div>
        </div>
        <button
          type='submit'
          onClick={handleSubmit((data: UserLoginType) => {
            console.log(data)
          })}
          // disabled={!isValid} //this is will didabled the button if the form is not valid
          className='mt-8 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          Sign in
        </button>
        {/* <!-- End Form --> */}

        <div className='text-center mt-8'>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Don't have an account yet?{' '}
            <Link
              passHref
              href='/register'
              className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
