import { type JSX, useEffect, useState } from 'react'

import Link from 'next/link'
import { Button, Input, Select } from 'antd/lib'

import { CustomerTable } from '@/components/table-headers/customer-tableheader'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import { disptachCustomer } from '@/providers/customer-provider'

export default function Customers(): JSX.Element {
  const { data: customer, isLoading } = disptachCustomer()
  const [searched, setSearch] = useState<string>('')
  const [filteredData, setFilteredData] = useState(customer)

  useEffect(() => {
    if (customer) {
      setFilteredData(customer.filter((customer) => customer.customer_contact_name.toLowerCase().includes(searched.toLowerCase())))
    }
  }, [searched, customer])

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search customer' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Type'}
          style={{ width: 150 }}
          options={[
            { label: 'Individual', value: 'INDIVIDUAL' },
            { label: 'Corporate', value: 'CORPORATE' },
          ]}
        /> */}
        <Link passHref href={'/dashboard/customers/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <CustomerTable isLoading={isLoading} data={filteredData} />
      </div>
    </div>
  )
}
