import { useState, type JSX } from 'react'

import { Button, Input, Select } from 'antd/lib'
import Link from 'next/link'

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { TaxTable } from '@/components/table-headers/tax-tableheader'
import { disptachTax } from '@/providers/tax-provider'

export default function Tax(): JSX.Element {
  const { data, isLoading } = disptachTax()
  const [searched, setSearch] = useState<string>('')
  return (
    <div className='bg-white h-full w-full flex flex-col items-center mx-auto gap-6 overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search Tax' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'Visible', value: 'VISIBLE' },
            { label: 'Invisible', value: 'INVISIBLE' },
          ]}
        />
        <Link passHref href={'/dashboard/taxes/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <TaxTable isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
