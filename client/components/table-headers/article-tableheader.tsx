import { type FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

import { Button, Space, message, Popconfirm, Table, type TableColumnsType, Tag } from 'antd/lib'

import { useMutation } from '@tanstack/react-query'
import { DELETE } from '@/actions/article-actions'
import { queryClient } from '@/util/react-query-client'
import { Typography } from 'antd'

interface ComponentProps {
  isLoading: boolean
  data: ArticleType[]
}

export const ArticleTable: FC<ComponentProps> = ({ isLoading, data = [] }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { pathname } = useRouter()

  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onSuccess: () =>
      messageApi.open({
        type: 'success',
        content: 'Item successfully deleted.',
      }),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Cannot delete this item.',
      }),
  })

  // table header
  const articleColumns: TableColumnsType<ArticleType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Name',
      dataIndex: 'article_name',
      key: 'article_name',
      sorter: (a, b) => a.article_name.toLowerCase().localeCompare(b.article_name.toLowerCase()),
      render: (article_name) => <p className='capitalize'>{article_name}</p>,
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'article_price',
      key: 'article_price',
      render: (_, record) => Intl.NumberFormat('en-EN', { style: 'currency', currency: record.article_currency }).format(record.article_price),
    },
    pathname.includes('expenses') !== false
      ? {
          title: 'Buy Price',
          dataIndex: 'article_buy_price',
          key: 'article_buy_price',
        }
      : {
          title: 'Type',
          dataIndex: 'article_type',
          key: 'article_type',
          render: (unit) => {
            switch (unit) {
              case 'SERVICE':
                return (
                  <Tag className='font-medium' color='blue'>
                    Service
                  </Tag>
                )
              case 'PRODUCT':
                return (
                  <Tag className='font-medium' color='green'>
                    Product
                  </Tag>
                )
              default:
                return (
                  <Tag className='font-medium' color='red'>
                    Other
                  </Tag>
                )
            }
          },
        },
    {
      title: 'is Taxeable',
      dataIndex: 'article_tax_enabled',
      key: 'article_tax_enabled',
      render: (tax) => (tax === true ? <Tag color='green'>YES</Tag> : <Tag color='red'>NO</Tag>),
    },
    {
      title: 'Unit',
      dataIndex: 'article_unit',
      key: 'article_unit',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Space>
          <Link href={pathname.includes('expenses') ? `/dashboard/expenses/${id}` : `/dashboard/articles/${id}`}>
            <Button icon={<LuFileEdit size={18} />} />
          </Link>
          <Popconfirm title='Delete the task' description='Are you sure to delete this task?' okText='Yes' cancelText='No' onConfirm={() => mutate(id)}>
            <Button icon={<LuTrash size={18} />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  // table pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
  })

  return (
    <>
      {contextHolder}
      <Table
        columns={articleColumns}
        rowKey={'id'}
        dataSource={data}
        loading={isLoading}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <p className='first-letter:uppercase' style={{ margin: 0 }}>
              {record.article_description}
            </p>
          ),
        }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '25', '40', '55'],
          showQuickJumper: true,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize, total: pagination.total }),
          style: { padding: '0 24px' },
        }}
      />
    </>
  )
}
