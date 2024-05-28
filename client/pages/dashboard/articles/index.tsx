import { type JSX } from 'react'
import Link from 'next/link'

import { Button, Input } from 'antd/lib'

import { AiOutlineSearch } from 'react-icons/ai'
import { ArticleTable } from '@/components/table-headers/article-tableheader'
import { disptachArticle } from '@/providers/article-provider'

export default function Articles(): JSX.Element {
  const { data, isLoading } = disptachArticle()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <Input placeholder='Search Article' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/articles/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <ArticleTable isLoading={isLoading} data={data.filter((el) => el.article_type !== 'EXPENSE')} />
      </div>
    </div>
  )
}
