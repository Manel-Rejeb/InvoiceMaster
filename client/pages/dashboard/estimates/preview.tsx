import { type JSX } from 'react'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { Button } from 'antd'
import { FIND } from '@/actions/estimate-actions'
import { InvoiceTemplate } from '@/components/template/invoice-template'

export default function EstimatePreview({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <div className='w-full'>
      <div className='max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10'>
        <div className='sm:w-11/12 lg:w-3/4 mx-auto'>
          <InvoiceTemplate data={data} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const { query } = context
  const data = await FIND(query.ref as string)
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: EstimateType }>
