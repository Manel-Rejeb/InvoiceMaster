import { type JSX } from 'react'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Button, Input } from 'antd/lib'

import { GET } from '@/actions/customer-actions'
import { CustomerTable } from '@/components/table-headers/customer-tableheader'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Customers(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: GET,
    staleTime: 0,
  })

  return (
    <div className='bg-white h-full w-full flex flex-col items-center border shadow-sm mx-auto gap-6 rounded-md overflow-hidden'>
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
