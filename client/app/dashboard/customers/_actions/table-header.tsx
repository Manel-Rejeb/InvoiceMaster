'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { DELETE } from './customer-actions'

export const customerColumns: ColumnDef<CustomerType>[] = [
  {
    id: 'customer-reference',
    header: 'Reference',
    accessorKey: 'customer_reference',
  },
  {
    id: 'customer-email',
    header: 'Name',
    accessorKey: 'customer_email',
    cell: ({ row }) => (
      <div>
        <div>
          {!row.original.type_customer
            ? `${row.original.individual?.first_name} ${row.original.individual?.last_name}`
            : row.original.corporate?.corporation_name}
        </div>
        <div>
          <p>{row.original.customer_email}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'customer-type',
    header: 'Type',
    accessorFn: (row) => (row.type_customer ? 'Corporate' : 'Individual'),
  },
  {
    id: 'customer-address',
    header: 'Address',
    accessorKey: 'customer_address',
  },
  {
    id: 'customer-number',
    header: 'Phone number',
    accessorKey: 'customer_number',
  },
  {
    id: 'customer-country',
    header: 'Country',
    accessorKey: 'customer_country',
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end capitalize'>{header.column.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex item-center justify-end gap-2'>
        <Link href={`/dashboard/customer/${row.original.id}`}>
          <Edit className='text-blue-500' size={18} />
        </Link>
        <button onClick={() => DELETE(row.original.id)}>
          <Trash className='text-red-500' size={18} />
        </button>
      </div>
    ),
  },
]
