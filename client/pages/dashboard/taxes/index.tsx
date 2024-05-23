import { type JSX } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Button, Input } from 'antd/lib'
import Link from 'next/link'

import { GET } from '@/actions/tax-action'
import { AiOutlineSearch } from 'react-icons/ai'
import { TaxTable } from '@/components/table-headers/tax-tableheader'

export default function Tax(): JSX.Element {

  const { data, isLoading } = useQuery({
    queryKey: ['taxes'],
    queryFn: GET,
    staleTime: 0,
  })

  return (
    <div className='bg-white h-full w-full flex flex-col items-center border shadow-sm mx-auto gap-6 rounded-md overflow-hidden'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <Input placeholder='Search Tax' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/taxes/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <TaxTable isLoading={isLoading} data={data} />  
      </div>
    </div>
  )
}
