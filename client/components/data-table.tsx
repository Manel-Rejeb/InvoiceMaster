'use client'

import type { JSX, PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import { type ColumnDef, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, type SortingState, type PaginationState } from '@tanstack/react-table'
import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from 'react-icons/lu'

import { Button, Select } from 'antd/lib'


/*
  a table should accept props - columns / data  
 */
interface ComponentProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
}

export function DataTable<T>({ data, columns }: PropsWithChildren<ComponentProps<T>>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  const cols: ColumnDef<T>[] = useMemo<ColumnDef<T>[]>(() => [...columns], [columns])

  const table = useReactTable({
    columns: cols,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: data.length,
    state: {
      pagination: pagination,
      sorting: sorting,
    },
  })

  return (
    <div className='w-full overflow-hidden'>
      {/* <div className='flex items-center p-4'></div> */}
      <table className='w-full rounded-none'>
        <thead className='bg-gray-100 h-[42px]'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='px-3 capitalize'
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : 'auto',
                  }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-state={row.getIsSelected() && 'selected'} className='h-[64px]'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-3'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr aria-colspan={columns.length}>
              <td className='text-center text-sm text-content-display py-4' colSpan={columns.length}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='w-full flex-1 flex items-center justify-between px-6'>
        <div className='flex-1 flex items-center space-x-6 lg:space-x-8'>
          <div className='flex-1 w-full flex items-center space-x-2'>
            <div className='flex items-center justify-center text-sm font-medium'>
              <p className='text-sm font-medium'>
                Showing 1 to {Math.min(table.getState().pagination.pageSize, table.getRowCount())} of {table.getRowCount()}
              </p>
            </div>
            <Select
              defaultValue={`${table.getState().pagination.pageSize}`}
              onChange={(value) => {
                table.setPageSize(Number(value))
              }}
              options={[
                { value: '5', label: '5' },
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '30', label: '30' },
                { value: '50', label: '50' },
              ]}
            />
          </div>
          <div className='flex items-center space-x-2'>
            <Button icon={<LuChevronFirst className='h-4 w-4' />} onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
            <Button icon={<LuChevronLeft className='h-4 w-4' />} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button icon={<LuChevronRight className='h-4 w-4' />} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
            <Button icon={<LuChevronLast className='h-4 w-4' />} onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} />
          </div>
        </div>
      </div>
    </div>
  )
}
