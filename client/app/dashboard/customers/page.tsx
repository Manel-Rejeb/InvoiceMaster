import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { GET } from './_actions/customer-actions'
import { DataTable } from '@/components/data-table'
import { customerColumns } from './_actions/table-header'

export default async function page() {
  const Customers: CustomerType[] = (await GET()) || []

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Customers</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of all your costumers.</p>
        </div>

        <Link passHref href={'/dashboard/customers/corporate'}>
          <Button>Create Customer</Button>
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        {Customers ? (
          <div className='w-full h-full flex-1'>
            <DataTable<CustomerType> data={Customers} columns={customerColumns} />
          </div>
        ) : (
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no Customers</h3>
            <p className='text-sm text-muted-foreground'>You can start creating new customers.</p>
            <Link passHref href={'/dashboard/article/new'}>
              <Button className='mt-4'>Add New Customer</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
