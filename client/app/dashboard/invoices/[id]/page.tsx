'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  const { push } = useRouter()

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Invoices</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of invoices that you provide as services.</p>
        </div>

        <Button variant='destructive' onClick={() => push('/dashboard/invoices')}>
          Cancel
        </Button>
      </div>

      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6'>
          <div className='flex flex-col gap-4 mb-6'>
            <div className='flex gap-4'>
              <div className='flex-1 flex flex-col gap-4'></div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
