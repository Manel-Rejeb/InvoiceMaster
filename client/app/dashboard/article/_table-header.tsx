'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Trash, Edit } from 'lucide-react'

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
        <button>
          <Edit className='text-blue-500' size={18} />
        </button>
        <button>
          <Trash className='text-red-500' size={18} />
        </button>
      </div>
    ),
  },
]
