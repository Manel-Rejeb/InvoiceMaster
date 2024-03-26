import { Input } from '@/ui/input/input'
import Link from 'next/link'
import type { FC } from 'react'

export const TaxCurrency: FC = () => {
  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      {/* <!-- Header --> */}
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Tax Value Configuration</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Enter you credentials to connect to your account.</p>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Body --> */}
      <div className='flex flex-col'>
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700'>
          <div className='flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-700 '>
            <button
              type='button'
              className='capitalize py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
              <svg
                className='flex-shrink-0 size-4'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'>
                <path d='M5 12h14' />
                <path d='M12 5v14' />
              </svg>
              Add new tax
            </button>
          </div>

          <div className='flex flex-col gap-4 p-8'>
            <div className='flex gap-4'>
              <Input required type='text' placeholder='Tax name' />
              <div className='flex rounded-lg shadow-sm'>
                <Input
                  style={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
                  required
                  type='number'
                  placeholder='Tax rate'
                />
                <span className='px-4 inline-flex items-center rounded-e-md border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400'>
                  %
                </span>
              </div>
            </div>

            <div className='flex gap-4'>
              <Input required type='text' placeholder='Tax name' />
              <div className='flex rounded-lg shadow-sm'>
                <Input
                  style={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
                  required
                  type='number'
                  placeholder='Tax rate'
                />
                <span className='px-4 inline-flex items-center rounded-e-md border  border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400'>
                  %
                </span>
              </div>
            </div>
          </div>

          <div className='max-w-sm w-full min-h-[200px] flex flex-col justify-center mx-auto px-6 py-4'></div>
          {/* <!-- End Body --> */}
        </div>
        <div className='flex items-center justify-between gap-4 py-4'>
          <Link
            href={`/org?step=3`}
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Skip this step
          </Link>
          <Link
            href={`/org?step=3`}
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Next Step
          </Link>
        </div>
      </div>
    </div>
  )
}
