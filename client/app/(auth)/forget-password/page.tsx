'use client'
import { Input } from '@/components/input/input'

const Page = () => {
  return (
    <div className='w-full max-w-[400px]'>
      <div className='text-center'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Forgot password?</h1>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Enter your email to reset your password </p>
      </div>

      <div className='mt-8'>
        {/* <!-- Form --> */}
        <div className='grid gap-y-4'>
          <Input type='email' placeholder='Enter your email' autoComplete='off' />
        </div>
        <div className='mt-8 grid gap-3 w-full sm:inline-flex'>
          <button
            type='submit'
            className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Send
          </button>
          <button
            type='submit'
            className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Cancel
          </button>
        </div>
        {/* <!-- End Form --> */}
      </div>
    </div>
  )
}

export default Page
