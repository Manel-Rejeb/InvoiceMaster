import { type JSX } from 'react'

import { GET } from '@/actions/customer-actions'
import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd/lib'
import { customerColumns } from '@/components/table-headers/customer-tableheader'
import { DataTable } from '@/components/data-table'


export default function Customers() : JSX.Element {
   const {data: customers, isLoading} = useQuery({
         queryKey: ['customers'],
         queryFn: GET,
         staleTime: 0
   })

if(isLoading) {
    return (
        <div className="flex items-center justify-center w-full h-full">
        <Spin />
        </div>
    )
}

    return (
        <div className='w-full flex items-center justify-center'>
        <DataTable<CustomerType> data={customers} columns={customerColumns} />
      </div>
    )
}