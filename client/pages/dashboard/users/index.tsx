import { type JSX } from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from 'react-icons/ai'

import { Button, Input } from 'antd/lib'
import { UserTable } from '@/components/table-headers/user-header'
import { disptachUser } from '@/providers/user-provider'

export default function Projects(): JSX.Element {
  const { data, isLoading } = disptachUser()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between'>
        <div>
          <Input placeholder='Search User' suffix={<AiOutlineSearch />} />
        </div>
        <Link passHref href={'/dashboard/users/create'}>
          <Button type='primary' className='capitalize'>
            create new
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <UserTable isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
