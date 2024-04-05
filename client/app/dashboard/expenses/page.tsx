import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function page() {
  const allexpenses: string[] = []

  if (allexpenses.length === 0) {
    return (
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>You have no expenses</h3>
        <p className='text-sm text-muted-foreground'>You can start creating new expense.</p>
        <Link passHref href={'/dashboard/article/new'}>
          <Button className='mt-4'>Add expense</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-1 text-center'>
      <h3 className='text-2xl font-bold tracking-tight'>table</h3>
    </div>
  )
}
