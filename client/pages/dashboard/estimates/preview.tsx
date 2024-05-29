import { InvoiceTemplate } from '@/components/template/invoice-template'
import { type JSX } from 'react'

export default function EstimatePreview(): JSX.Element {
  return (
    <div className='w-full'>
      <InvoiceTemplate />
    </div>
  )
}
