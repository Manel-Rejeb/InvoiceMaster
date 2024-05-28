import { type JSX } from 'react'

import { Button, Input } from 'antd/lib'
import Link from 'next/link'

import { AiOutlineSearch } from 'react-icons/ai'
import { TaxTable } from '@/components/table-headers/tax-tableheader'
import { disptachTax } from '@/providers/tax-provider'

export default function Tax(): JSX.Element {
  const { data, isLoading } = disptachTax()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
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
