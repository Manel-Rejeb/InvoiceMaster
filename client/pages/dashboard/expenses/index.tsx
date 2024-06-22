import { useState, type JSX } from 'react'
import Link from 'next/link'

import { Button, Input, Select } from 'antd/lib'

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { ArticleTable } from '@/components/table-headers/article-tableheader'
import { disptachArticle } from '@/providers/article-provider'
import { CURRENCY } from '@/constants/CURRENCY'

export default function Expenses(): JSX.Element {
  const { data, isLoading } = disptachArticle()
  const [searched, setSearch] = useState<string>('')
  const filterOption = (input: string, option?: { label: string; value: string | number }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search expense' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Unit'}
          style={{ width: 150 }}
          options={[
            { label: 'project', value: 'PROJECT' },
            { label: 'quantity', value: 'QUANTITY' },
            { label: 'hour', value: 'HOUR' },
            { label: 'day', value: 'DAY' },
          ]}
        /> */}

        {/* <Select size='large' variant='filled' showSearch allowClear placeholder='Currency' filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} /> */}
        <Link passHref href={'/dashboard/expenses/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <ArticleTable isLoading={isLoading} data={data.filter((el) => el.article_type === 'EXPENSE')} />
      </div>
    </div>
  )
}
