'use client'
import { Input } from '@/ui/input/input'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='w-full max-w-[400px]'>
      <div className='text-center'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Sign up</h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Let’s get started with 30 days free trial</p>
      </div>

      <div className='mt-8'>
        {/* <!-- Form --> */}

        <div className='grid gap-y-4'>
          {/* <!-- Form Group --> */}
          <Input type='text' placeholder='User name' autoComplete='off' />
          <Input type='email' placeholder='Enter your email' autoComplete='off' />
          <Input type='password' placeholder='Confirm your password' autoComplete='new-password' />
        </div>

        <button
          type='submit'
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
