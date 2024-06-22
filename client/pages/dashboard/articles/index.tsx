import { type JSX, useState, useEffect } from 'react'
import Link from 'next/link'

import { Button, Input } from 'antd/lib'

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { ArticleTable } from '@/components/table-headers/article-tableheader'
import { disptachArticle } from '@/providers/article-provider'

export default function Articles(): JSX.Element {
  const { data: article, isLoading } = disptachArticle()
  const [searched, setSearch] = useState<string>('')
  const filterOption = (input: string, option?: { label: string; value: string | number }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  const [filteredData, setFilteredData] = useState(article)

  useEffect(() => {
    if (article) {
      setFilteredData(article.filter((article) => article.article_name.toLowerCase().includes(searched.toLowerCase())))
    }
  }, [searched, article])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto gap-6  overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4'>
        <div className='w-full'>
          <Input variant='filled' size='large' placeholder='Search Article' prefix={<AiOutlineSearch />} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* <Select                        
          size='large'
          allowClear
          variant='filled'
          placeholder={'Status'}
          style={{ width: 150 }}
          options={[
            { label: 'Service', value: 'SERVICE' },
            { label: 'Product', value: 'PRODUCT' },
          ]}
        /> */}
        {/* <Select
          size='large'
          allowClear
          variant='filled'
          placeholder={'Unit'}
          style={{ width: 150 }}
          options={[
            { label: 'Project', value: 'PROJECT' },
            { label: 'Quantity', value: 'QUANTITY' },
            { label: 'Hour', value: 'HOUR' },
            { label: 'Day', value: 'DAY' },
          ]}
        /> */}

        {/* <Select size='large' variant='filled' showSearch allowClear placeholder='Currency' filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} /> */}
        <Link passHref href={'/dashboard/articles/create'}>
          <Button type='primary' size='large' className='capitalize'>
            <div className='flex items-center gap-2'>
              <AiOutlinePlus />
              <p>Create New</p>
            </div>
          </Button>
        </Link>
      </div>

      <div className='w-full'>
        <ArticleTable isLoading={isLoading} data={filteredData.filter((el) => el.article_type !== 'EXPENSE')} />
      </div>
    </div>
  )
}
