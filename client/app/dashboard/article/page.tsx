import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/data-table'

import { articleColumns } from './_table-header'

const getArticles = async function (): Promise<ArticleType[]> {
  return fetch('http://localhost:7080/api/article', {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export default async function page() {
  const allService: ArticleType[] = (await getArticles()) || []

  if (allService.length === 0) {
    return (
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>You have no Articles</h3>
        <p className='text-sm text-muted-foreground'>You can start creating new articles.</p>
        <Link passHref href={'/dashboard/article/new'}>
          <Button className='mt-4'>Add service</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex-1'>
      <DataTable<ArticleType> data={allService} columns={articleColumns} />
    </div>
  )
}
