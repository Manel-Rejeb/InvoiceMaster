'use client'

import { Trash, Edit } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { DELETE } from './server-action'
import Link from 'next/link'

export const expenseColumns: ColumnDef<ExpenseType>[] = [
  {
    id: 'expense-name',
    header: 'expense Name',
    accessorKey: 'expense_name',
  },
  {
    id: 'expense-description',
    header: 'Description',
    accessorKey: 'expense_description',
  },
  {
    id: 'expense-type',
    header: 'Type',
    accessorKey: 'expense_type',
    accessorFn: (row) => (row.expense_type ? 'Service' : 'Product'),
  },
  {
    id: 'buy price',
    header: 'Buy Price',
    accessorFn: (row) =>
      Intl.NumberFormat('fr-TN', { style: 'currency', currency: row.expense_currency }).format(row.expense_buy_price),
  },
  {
    id: 'sell price',
    header: 'Sell Price',
    accessorFn: (row) =>
      Intl.NumberFormat('fr-TN', { style: 'currency', currency: row.expense_currency }).format(row.expense_sell_price),
  },
  {
    id: 'tax',
    header: 'Tax',
    accessorFn: (row) => `${row.expense_tax}%`,
  },
  {
    id: 'quantity',
    header: 'Unit',
    accessorKey: 'expense_unit',
  },
  {
    id: 'Currency',
    header: 'Currency',
    accessorKey: 'expense_currency',
  },

  {
    id: 'actions',
    header: ({ header }) => <div className='text-end capitalize'>{header.column.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex items-center justify-end gap-2'>
        <Link href={`/dashboard/expense/${row.original.id}`}>
          <Edit className='text-blue-500' size={18} />
        </Link>
        <button onClick={() => DELETE(row.original.id)}>
          <Trash className='text-red-500' size={18} />
        </button>
      </div>
    ),
  },
]
