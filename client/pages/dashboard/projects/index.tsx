import { useEffect, useState, type JSX } from 'react'
import Link from 'next/link'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import { Button, Input, Select } from 'antd/lib'
import { ProjectTable } from '@/components/table-headers/project-tableheader'
import { disptachProject } from '@/providers/project-provider'

export default function Projects(): JSX.Element {
  const { data: project, isLoading } = disptachProject()
  const [searched, setSearch] = useState<string>('')
  const [filteredData, setFilteredData] = useState(project)

  useEffect(() => {
    if (project) {
      setFilteredData(project.filter((project) => project.project_name.toLowerCase().includes(searched.toLowerCase())))
    }
  }, [searched, project])

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search project' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'OnBording', value: 'OnBording' },
            { label: 'Ongoing', value: 'Ongoing' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Cancelled', value: 'Cancelled' },
            { label: 'OnHold', value: 'OnHold' },
          ]}
        /> */}
        <Link passHref href={'/dashboard/projects/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <ProjectTable isLoading={isLoading} data={filteredData} />
      </div>
    </div>
  )
}
