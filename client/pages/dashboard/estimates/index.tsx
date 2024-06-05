import { type JSX, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { Button, Input, Typography, Select } from 'antd/lib'

import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'

import { disptachEstimate } from '@/providers/estimate-provider'
import { EstimateTable } from '@/components/table-headers/estimate-header'

export default function Estimates(): JSX.Element {
  const { data, isLoading } = disptachEstimate()

  const [searched, setSearch] = useState<string>('')

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <Head>
        <title>Estimates</title>
      </Head>

      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search Article' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'Expense', value: 'ACCEPTED' },
            { label: 'Draft', value: 'DRAFT' },
          ]}
        />
        <Link passHref href={'/dashboard/estimates/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <EstimateTable isLoading={isLoading} data={data.filter((el) => el.estimate_reference.toLocaleLowerCase().includes(searched))} />
      </div>
    </div>
  )
}
