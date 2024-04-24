import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/data-table'
import { articleColumns } from '@/app/dashboard/article/_actions/table-header'
import { GET } from '@/app/dashboard/article/_actions/server-action'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default async function page() {
  const articles: ArticleType[] = (await GET()) || []

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Articles</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of articles that you provide as services.</p>
          {/* <form className='w-full max-w-[350px]'>
            <div className='flex relative '>
              <Search className='absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search products...'
                className='w-full appearance-none bg-background pl-8 shadow-none flex-col gap-4'
              />
            </div>
          </form> */}
        </div>

        <Link passHref href={'/dashboard/article/new'}>
          <Button>Create Article</Button>
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
