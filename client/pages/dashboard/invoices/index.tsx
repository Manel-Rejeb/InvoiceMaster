import { EstimateTable } from '@/components/table-headers/estimate-header'
import { disptachEstimate } from '@/providers/estimate-provider'
import { Button, Input, Select } from 'antd/lib'
import Link from 'next/link'
import { useState, type JSX } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

export default function Invoices(): JSX.Element {
  const { data, isLoading } = disptachEstimate()
  const [searched, setSearch] = useState<string>('')
  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search invoice' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'paid', value: 'PAID' },
            { label: 'unpaid', value: 'UNPAID' },
            { label: 'partually paid', value: 'PAETUALLY PAID' },
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
