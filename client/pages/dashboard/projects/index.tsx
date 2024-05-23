import { GET } from '@/actions/project-actions'
import { ArticleTable } from '@/components/table-headers/article-tableheader'
import { useQuery } from '@tanstack/react-query'
import { Button, Input } from 'antd/lib'
import Link from 'next/link'
import { type JSX } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Projects() : JSX.Element {
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