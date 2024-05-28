import { type JSX } from 'react'

import Link from 'next/link'
import { Button, Input } from 'antd/lib'

import { CustomerTable } from '@/components/table-headers/customer-tableheader'
import { AiOutlineSearch } from 'react-icons/ai'

import { disptachCustomer } from '@/providers/customer-provider'

export default function Customers(): JSX.Element {
  const { data, isLoading } = disptachCustomer()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <Input placeholder='Search Customer' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/customers/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <CustomerTable isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
