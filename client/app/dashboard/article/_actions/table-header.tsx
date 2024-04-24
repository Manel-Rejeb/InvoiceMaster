'use client'

import { Trash, Edit } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { DELETE } from './server-action'
import Link from 'next/link'

export const articleColumns: ColumnDef<ArticleType>[] = [
  {
    id: 'id',
    header: 'id',
    accessorKey: 'id',
  },
  {
    id: 'article-name',
    header: 'Article Name',
    accessorKey: 'article_name',
  },
  {
    id: 'price',
    header: 'Price',
    accessorFn: (row) =>
      Intl.NumberFormat('fr-TN', { style: 'currency', currency: row.article_currency }).format(row.article_price),
  },
  {
    id: 'updated-at',
    header: 'Created At',
    accessorFn: (row) => new Date(row.updatedAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end capitalize'>{header.column.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex items-center justify-end gap-2'>
        <Link href={`/dashboard/article/${row.original.id}`}>
          <Edit className='text-blue-500' size={18} />
        </Link>
        <button onClick={() => DELETE(row.original.id)}>
          <Trash className='text-red-500' size={18} />
        </button>
      </div>
    ),
  },
]
