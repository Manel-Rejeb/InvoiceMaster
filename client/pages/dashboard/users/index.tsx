import { useEffect, useState, type JSX } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import { Button, Input, Select } from 'antd/lib'
import { UserTable } from '@/components/table-headers/user-header'
import { disptachUser } from '@/providers/user-provider'

export default function Projects(): JSX.Element {
  const { data: user, isLoading } = disptachUser()
  const [searched, setSearch] = useState<string>('')
  const [filteredData, setFilteredData] = useState(user)

  useEffect(() => {
    if (user) {
      setFilteredData(user.filter((user) => user.username.toLowerCase().includes(searched.toLowerCase())))
    }
  }, [searched, user])

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search user' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'moderator', value: 'MODERATOR' },
            { label: 'client', value: 'CLIENT' },
          ]}
        />
        <Link passHref href={'/dashboard/users/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <UserTable isLoading={isLoading} data={filteredData} />
      </div>
    </div>
  )
}
