'use client'
import type { FC } from 'react'
import { mr } from '@/lib/mr'
import { useState } from 'react'

export const PaymentOptions: FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ id: string; src: string }[]>([])
  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Online payments configuration</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Chose your desired online payment getway.</p>
      </div>

      {/* <!-- Grid --> */}
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6'>
        {payment_methods.map((item, index: number) => (
          <div
            onClick={() =>
              selectedOptions.includes(item)
                ? setSelectedOptions([...selectedOptions.filter((i) => i !== item)])
                : setSelectedOptions([...selectedOptions, item])
            }
            key={index}
            className={mr(
              'p-7 flex items-center justify-center rounded-lg cursor-pointer bg-gray-100 border',
              selectedOptions.includes(item) ? 'border-blue-600' : 'border-gray-100'
            )}>
            <img src={item.src} alt={item.id} className='flex w-full h-12 object-contain' />
          </div>
        ))}
      </div>
      {/* <!-- End Grid --> */}
      <div className='flex items-center justify-end'>
        <button className=' capitalize py-3 px-7 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
          Confirm
        </button>
      </div>
    </div>
  )
}

const payment_methods: { id: string; src: string }[] = [
  {
    id: 'method1',
    src: 'https://th.bing.com/th/id/R.4d090e9140a335b77f35350a16afbd40?rik=L4%2b7av3z1%2fTpRA&pid=ImgRaw&r=0',
  },
  {
    id: 'method2',
    src: 'https://th.bing.com/th/id/R.d969ff4301a6f3e3f0d3db5e037b60f6?rik=LpoWeK4jYtEkyA&pid=ImgRaw&r=0',
  },
  {
    id: 'method3',
    src: 'https://th.bing.com/th/id/R.12157bd2c525a40802c8c90fe5fc432a?rik=WEELBQLnn9vtZA&pid=ImgRaw&r=0',
  },
  { id: 'method4', src: 'https://www.drupal.org/files/project-images/ClicToPay_logo.png' },
  { id: 'method5', src: 'https://ufxone.com/wp-content/uploads/2023/10/f.png' },
  { id: 'method6', src: 'https://itstaskable.com/wp-content/uploads/2021/03/Payoneer-logo-1200x422.png' },
]
