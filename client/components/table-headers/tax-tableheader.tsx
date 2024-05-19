import { useState } from 'react'

import { LuTrash, LuFileEdit } from 'react-icons/lu'
import { useMutation } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'

import { DELETE } from '@/actions/tax-action'
import { queryClient } from '@/util/react-query-client'
import { DeleteModal } from '@/components/delete-modal'

export const taxColumns: ColumnDef<TaxType>[] = [
  {
    id: 'tax_name',
    header: 'Title',
    accessorKey: 'tax_name',
  },
  {
    id: 'tax_percentage',
    header: 'Percentage',
    accessorFn: (row) => `${row.tax_percentage}%`,
  },
  {
    id: 'tax_description',
    header: 'Description',
    accessorKey: 'tax_description',
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
          return await queryClient.invalidateQueries({ queryKey: ['taxes'] })
        },
        onSuccess: () => setIsModelOpen(false),
        onError: () => {
          alert('not deleted')
        },
      })

      return (
        <div className='flex flex-row-reverse justify-end gap-2'>
          <button title='Delete Item'>
            <LuTrash size={21} className='text-red-600' onClick={() => setIsModelOpen(true)} />
            <DeleteModal
              title={`Delete ${row.original.tax_name}`}
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
