'use client'

import Link from 'next/link'

const Page = () => {
  return (
    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white'>
      <div className=' bg-gray-100 border rounded-lg p-5 dark:bg-slate-900'>
        <div className='flex flex-col items-center gap-x-4 mb-3'>
          <div className='inline-flex justify-center items-center size-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800'>
            <svg fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-6 h-6'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
              />
            </svg>
          </div>
          <div className='flex-shrink-0'>
            <h3 className='block text-lg font-semibold text-gray-800 dark:text-white'>Reset Successfully </h3>
          </div>
        </div>
        <p className='text-gray-600 dark:text-gray-400'>Your Password has been reset successfully.</p>
        <Link
          href='/login'
          passHref
          type='submit'
          className='mt-8 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          Sign in
        </Link>
      </div>
    </div>
  )
}
export default Page
