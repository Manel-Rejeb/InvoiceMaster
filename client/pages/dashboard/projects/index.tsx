import { type JSX } from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'

import { Button, Input } from 'antd/lib'
import { ProjectTable } from '@/components/table-headers/project-tableheader'

import { GET } from '@/actions/project-actions'
import { useQuery } from '@tanstack/react-query'

export default function Projects(): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: GET,
    staleTime: 0,
  })
  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <Input placeholder='Search Article' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/projects/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <ProjectTable isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
