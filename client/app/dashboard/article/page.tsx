import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/data-table'
import { articleColumns } from '@/app/dashboard/article/_actions/table-header'
import { GET } from '@/app/dashboard/article/_actions/server-action'

export default async function page() {
  const articles: ArticleType[] = (await GET()) || []

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Articles</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of articles that you provide as services.</p>
        </div>
        <Link passHref href={'/dashboard/article/new'}>
          <Button>Create</Button>
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        {articles ? (
          <div className='w-full h-full flex-1'>
            <DataTable<ArticleType> data={articles} columns={articleColumns} />
          </div>
        ) : (
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no Articles</h3>
            <p className='text-sm text-muted-foreground'>You can start creating new articles.</p>
            <Link passHref href={'/dashboard/article/new'}>
              <Button className='mt-4'>Add New Article</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
