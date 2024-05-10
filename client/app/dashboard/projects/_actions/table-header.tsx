'use client'

import { Trash, Edit } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { DELETE } from './server-action'
import Link from 'next/link'

export const projectColumns: ColumnDef<ProjectType>[] = [
  {
    id: 'project-name',
    header: 'Project Name',
    accessorKey: 'project_name',
  },
  {
    id: 'project-description',
    header: 'Description',
    accessorKey: 'project_description',
  },
  {
    id: 'project-start-date',
    header: 'Start Date',
    accessorKey: 'project_start_date',
  },
  {
    id: 'project-end-date',
    header: 'End Date',
    accessorKey: 'project_end_date',
  },
  {
    id: 'project-status',
    header: 'Status',
    accessorKey: 'project_status',
    accessorFn: (row) => {
      switch (row.project_status) {
        case 'ONGOING':
          return 'Ongoing'
        case 'COMPLETED':
          return 'Completed'
        case 'ONHOLD':
          return 'On Hold'
        case 'ONBORDING':
          return 'Onboarding'
        case 'CANCELLED':
          return 'Cancelled'
        default:
          return 'Unknown'
      }
    },
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end capitalize'>{header.column.id}</div>,
    accessorKey: 'id',
    cell: ({ row }) => (
      <div className='flex items-center justify-end gap-2'>
        <Link href={`/dashboard/projects/${row.id}`}>
          <a>
            <Edit className='text-blue-500' size={18} />
          </a>
        </Link>
        <button onClick={() => DELETE(row.id)}>
          <Trash className='text-red-500' size={18} />
        </button>
      </div>
    ),
  },
]
