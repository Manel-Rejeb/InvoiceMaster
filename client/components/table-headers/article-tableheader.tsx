import {useState} from 'react'

import { ColumnDef } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

import { DELETE } from '@/actions/article-actions'
import { queryClient } from '@/util/react-query-client'
import { DeleteModal } from '../delete-modal'

export const articleColumns: ColumnDef<ArticleType>[] = [
  {
    id: 'article-name',
    header: 'Article Name',
    accessorKey: 'article_name',
  },
  {
    id: 'article-description',
    header: 'Description',
    accessorKey: 'article_description',
  },
  {
    id: 'article-type',
    header: 'Type',
    accessorKey: 'article_type',
    accessorFn: (row) => (row.article_type ? 'Service' : 'Product'),
  },
  {
    id: 'price',
    header: 'Price',
    accessorFn: (row) =>
      Intl.NumberFormat('fr-TN', { style: 'currency', currency: row.article_currency }).format(row.article_price),
  },
  {
    id: 'tax',
    header: 'Tax',
    accessorFn: (row) => `${row.article_tax}%`,
  },
  {
    id: 'quantity',
    header: 'Unit',
    accessorKey: 'article_unit',
  },
  {
    id: 'Currency',
    header: 'Currency',
    accessorKey: 'article_currency',
  },
  {
    id: 'actions',
    header: (row) => <div className='flex justify-end capitalize'>{row.header.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => {
        const [isModalOpen, setIsModelOpen] = useState(false)
        const { mutate } = useMutation({
          mutationFn: DELETE,
          onSettled: async () => {
            return await queryClient.invalidateQueries({ queryKey: ['articles'] })
          },
          onSuccess: () => setIsModelOpen(false),
          onError: () => {
            alert('not deleted')
          },
        })

    return(
        
        <div className='flex flex-row-reverse justify-end gap-2'>
            <button title='Delete Item'>
                <LuTrash size={21} className='text-red-600' onClick={() => setIsModelOpen(true)} />
                <DeleteModal
                  title={`Delete ${row.original.article_name}`}
                  description={`Are you sure you want to delete the item with id = ${row.original.id}?`}
                  isModalOpen={isModalOpen}
                  handleOk={() => mutate(row.original.id!)}
                  handleCancel={() => setIsModelOpen(false)}
                />
            </button>
            <button title='Update Item'>
                <LuFileEdit size={21} className='text-blue-600' />
            </button>
            <div className='flex-1' />
        </div>


    )
},
    },
    ]

