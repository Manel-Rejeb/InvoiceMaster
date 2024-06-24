import { type FC } from 'react'

import Image from 'next/image'

import { app } from '@/constants/APP'

interface ComponentProps {
  data: EstimateType
}

export const InvoiceTemplate: FC<ComponentProps> = ({ data }) => {
  return (
    <div id='PDF-Invoice' className='flex flex-col p-4 sm:p-10 bg-white'>
      <div className='flex justify-between'>
        <div>
          <Image src={app.logo} width={100} height={62} alt='visto logo' />
          <h1 className='mt-2 text-lg md:text-xl font-semibold text-gray-800 capitalize'>{app.name}.</h1>
        </div>

        <div className='text-end'>
          <h2 className='text-xl font-semibold text-gray-800'>{data.invoice ? 'Invoice' : 'Estimate'} #</h2>
          <span className='mt-1 block text-gray-500'>{data.estimate_reference}</span>

          <address className='not-italic text-gray-800 capitalize'>
            {app.detail.adress.street}
            <br />
            {app.detail.adress.city}, {app.detail.adress.zip}
            <br />
            Tunisia
            <br />
          </address>
        </div>
      </div>

      <div className='mt-8 grid sm:grid-cols-2 gap-3'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>Bill to:</h3>
          <h3 className='text-lg font-semibold text-gray-800 capitalize'>
            {data.customer.customer_contact_name} {data.customer.customer_contact_last_name}
          </h3>
          <address className='mt-2 not-italic text-gray-500 capitalize'>
            {data.customer.customer_address}
            <br />
            {data.customer.customer_city}, {data.customer.customer_zip},
            <br />
            {data.customer.customer_country}
            <br />
          </address>
        </div>

        <div className='sm:text-end space-y-2'>
          <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Invoice date:</dt>
              <dd className='col-span-2 text-gray-500'>{data.estimate_date.slice(0, 10)}</dd>
            </dl>
            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Due date:</dt>
              <dd className='col-span-2 text-gray-500'>{data.estimate_expiary_date.slice(0, 10)}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <div className='border border-gray-200 p-4 rounded-lg space-y-4'>
          <div className='hidden sm:grid sm:grid-cols-6'>
            <div className='sm:col-span-2 text-xs font-medium text-gray-500 uppercase'>Item</div>
            <div className='text-start text-xs font-medium text-gray-500 uppercase'>Qty</div>
            <div className='text-start text-xs font-medium text-gray-500 uppercase'>Rate</div>
            <div className='text-start text-xs font-medium text-gray-500 uppercase'>Tax</div>
            <div className='text-end text-xs font-medium text-gray-500 uppercase'>Amount</div>
          </div>

          <div className='hidden sm:block border-b border-gray-200'></div>

          {data.items.map((el: ItemEstimateType) => (
            <div key={el.id} className='grid grid-cols-3 sm:grid-cols-6 gap-2'>
              <div className='col-span-full sm:col-span-2'>
                <h5 className='sm:hidden text-xs font-medium text-gray-500 uppercase'>Item</h5>
                <p className='font-medium text-gray-800 capitalize'>{el.article?.article_name}</p>
              </div>
              <div>
                <h5 className='sm:hidden text-xs font-medium text-gray-500 uppercase'>Qty</h5>
                <p className='text-gray-800'>{el.item_quantity}</p>
              </div>
              <div>
                <h5 className='sm:hidden text-xs font-medium text-gray-500 uppercase'>Rate</h5>
                <p className='text-gray-800'>
                  {Intl.NumberFormat('fr-TN', {
                    style: 'currency',
                    currency: el.article?.article_currency,
                  }).format(el.item_price!)}
                </p>
              </div>
              <div>
                <h5 className='sm:hidden text-xs font-medium text-gray-500 uppercase'>Tax</h5>
                <p className='text-gray-800'>+{el.item_tax}%</p>
              </div>
              <div>
                <h5 className='sm:hidden text-xs font-medium text-gray-500 uppercase'>Amount</h5>
                <p className='sm:text-end text-gray-800'>
                  {Intl.NumberFormat('fr-TN', {
                    style: 'currency',
                    currency: el.article?.article_currency,
                  }).format((el.item_price! + (el.item_price! * el.item_tax) / 100) * el.item_quantity)}
                </p>
              </div>
            </div>
          ))}

          <div className='sm:hidden border-b border-gray-200'></div>
        </div>
      </div>

      <div className='mt-8 flex sm:justify-end'>
        <div className='w-full max-w-[300px] sm:text-end space-y-2'>
          <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Total HT:</dt>
              <dd className='col-span-2 text-gray-500'>
                {Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: data.estimate_currency,
                }).format(data.estimate_total)}
              </dd>
            </dl>

            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Discount:</dt>
              <dd className='col-span-2 text-gray-500'>
                -
                {Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: data.estimate_currency,
                }).format((data.estimate_total * data.estimate_discount) / 100)}
              </dd>
            </dl>

            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Tax:</dt>
              <dd className='col-span-2 text-gray-500'>
                +
                {Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: data.estimate_currency,
                }).format(((data.estimate_total - (data.estimate_total * data.estimate_discount) / 100) * data.estimate_tax) / 100)}
              </dd>
            </dl>

            <dl className='grid sm:grid-cols-5 gap-x-3'>
              <dt className='col-span-3 font-semibold text-gray-800'>Total:</dt>
              <dd className='col-span-2 text-gray-500'>
                {Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: data.estimate_currency,
                }).format(data.estimate_total)}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {data.estimate_notes !== '' && (
        <div className='mt-8 sm:mt-12'>
          <h4 className='text-lg font-semibold text-gray-800'>Notes!</h4>
          <div className='mt-2'>
            {JSON.parse(data.estimate_notes).map((el: { note: string }, index: number) => (
              <p key={index} className='block text-sm text-gray-800'>
                {index + 1} - {el.note}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className='mt-8 sm:mt-12'>
        <h4 className='text-lg font-semibold text-gray-800'>Thank you!</h4>
        <p className='text-gray-500'>If you have any questions concerning this invoice, use the following contact information:</p>
        <div className='mt-2'>
          <div className='flex gap-x-3 text-sm'>
            <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>From:</div>
            <div className='font-medium text-gray-800 dark:text-neutral-200'>
              <span className='block font-semibold capitalize'>{app.name}</span>
              <div className='not-italic font-normal'>{app.email}</div>
              <div className='not-italic font-normal'>
                {app.detail.adress.street} - {app.detail.adress.city} - {app.detail.adress.zip}
              </div>
            </div>
          </div>

          <div className='flex gap-x-3 mt-6 text-sm'>
            <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>Tax ID Number:</div>
            <div className='font-medium text-gray-800 dark:text-neutral-200'>
              <div className='not-italic font-normal'>{app.detail.TIN}</div>
            </div>
          </div>
        </div>
      </div>

      <p className='mt-5 text-sm text-gray-500'>© {new Date().getFullYear()} Manel.</p>
    </div>
  )
}
