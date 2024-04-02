'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { FC, ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'

type Tax = { name: string; rate: number }

export const TaxCurrency: FC = () => {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [newlyAddedValue, setNewlyAddedValue] = useState<Tax>({
    name: '',
    rate: 0,
  })

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
              onClick={() => {
                setTaxes([newlyAddedValue as Tax, ...taxes])
                setNewlyAddedValue({ name: '', rate: 0 })
              }}
              className='capitalize py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
              <svg
                className='flex-shrink-0 size-4'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M5 12h14' />
                <path d='M12 5v14' />
              </svg>
              Add new tax
            </button>
          </div>

          <div className='flex flex-col gap-4 p-8'>
            <div className='flex gap-4'>
              <Input
                required
                type='text'
                placeholder='Tax name'
                value={newlyAddedValue.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewlyAddedValue({ ...newlyAddedValue, name: e.target.value })
                }
              />
              <div className='flex rounded-lg shadow-sm'>
                <Input
                  required
                  type='number'
                  placeholder='Tax rate'
                  value={newlyAddedValue.rate === 0 ? '' : newlyAddedValue.rate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewlyAddedValue({ ...newlyAddedValue, rate: parseInt(e.target.value) })
                  }
                  style={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
                />
                <span className='px-4 inline-flex items-center rounded-e-md border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400'>
                  %
                </span>
              </div>
              <button
                type='button'
                onClick={() => setNewlyAddedValue({ name: '', rate: 0 })}
                className='flex justify-center items-center size-[46px] text-sm font-semibold rounded-lg border  border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                <svg fill='none' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </button>
            </div>
            <hr />
            {/* all added task */}
            {/* // to do : adding a condition in the next step btn, if the taxes array is empty, the btn should be disabled */}
            {taxes.map((tax: Tax, index: number) => (
              <div key={index} className='flex gap-4'>
                <Input
                  required
                  type='text'
                  placeholder='Tax name'
                  value={tax.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const updatedTaxes = [...taxes]
                    updatedTaxes[index].name = e.target.value
                    setTaxes(updatedTaxes)
                  }}
                />
                <div className='flex rounded-lg shadow-sm'>
                  <Input
                    required
                    type='number'
                    placeholder='Tax rate'
                    value={tax.rate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedTaxes = [...taxes]
                      taxes[index].rate = parseInt(e.target.value)
                      setTaxes(updatedTaxes)
                    }}
                    style={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
                  />
                  <span className='px-4 inline-flex items-center rounded-e-md border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400'>
                    %
                  </span>
                </div>
                <button
                  type='button'
                  onClick={() => setTaxes([...taxes.filter((el) => el !== taxes[index])])}
                  className='flex justify-center items-center size-[46px] text-sm font-semibold rounded-lg border  border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
                  <svg fill='none' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                    />
                  </svg>
                </button>
              </div>
            ))}
            {/* end all added task */}
          </div>

          <div className='max-w-sm w-full min-h-[200px] flex flex-col justify-center mx-auto px-6 py-4'></div>
          {/* <!-- End Body --> */}
        </div>
        <div className='flex items-center justify-between gap-4 pt-8'>
          <Link
            href={`/organization-config?step=3`}
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Skip this step
          </Link>
          <Link
            href={`/organization-config?step=3`}
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            Next Step
          </Link>
        </div>
      </div>
    </div>
  )
}
