import { DELETE } from "@/actions/customer-actions";
import { queryClient } from "@/util/react-query-client";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { LuFileEdit, LuTrash } from "react-icons/lu";
import { DeleteModal } from "../delete-modal";



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
        header: (row) => <div className='flex justify-end capitalize'>{row.header.id}</div>,
        accessorKey: 'id',
        cell: ({ row }) => {    
            const [isModalOpen, setIsModelOpen] = useState(false)
            const { mutate } = useMutation({
              mutationFn: DELETE,
              onSettled: async () => {
                return await queryClient.invalidateQueries({ queryKey: ['customers'] })
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
                      title={`Delete ${row.original.customer_reference}`}
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
        