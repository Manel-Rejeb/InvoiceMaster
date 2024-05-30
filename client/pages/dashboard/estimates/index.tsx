import { type JSX } from 'react'

import Link from 'next/link'
import { Button, Input } from 'antd/lib'

import { AiOutlineSearch } from 'react-icons/ai'

import { disptachEstimate } from '@/providers/estimate-provider'
import { EstimateTable } from '@/components/table-headers/estimate-header'

export default function Estimates(): JSX.Element {
  const { data, isLoading } = disptachEstimate()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-6'>
        <div className='w-full'>
          <Input placeholder='Search Article' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/estimates/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <EstimateTable isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
