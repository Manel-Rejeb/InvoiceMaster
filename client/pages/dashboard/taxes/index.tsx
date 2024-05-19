import { type JSX, useEffect } from 'react'

import { Spin } from 'antd/lib'
import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/tax-action'
import { DataTable } from '@/components/data-table'
import { taxColumns } from '@/components/table-headers/tax-tableheader'

export default function Tax(): JSX.Element {
  const { data: taxes, isLoading } = useQuery({
    queryKey: ['taxes'],
    queryFn: GET,
    staleTime: 0,
  })

  if (isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <DataTable<TaxType> data={taxes} columns={taxColumns} />
    </div>
  )
}
