import { type JSX } from 'react'
import Link from 'next/link'

import { Button, Input } from 'antd/lib'
import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/article-actions'
import { AiOutlineSearch } from 'react-icons/ai'
import { ArticleTable } from '@/components/table-headers/article-tableheader'

export default function Articles(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: GET,
    staleTime: 0,
  })


  return (
    <div className='bg-white h-full w-full flex flex-col items-center border shadow-sm mx-auto gap-6 rounded-md overflow-hidden'>
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
        <ArticleTable isLoading={isLoading} data={data} />  
      </div>
    </div>
  )
}
