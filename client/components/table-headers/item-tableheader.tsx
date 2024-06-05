import { type FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

import { Button, Space, message, Popconfirm, Table, type TableColumnsType, Tag } from 'antd/lib'

import { useMutation } from '@tanstack/react-query'
import { DELETE } from '@/actions/article-actions'
import { queryClient } from '@/util/react-query-client'

import { disptachTax } from '@/providers/tax-provider'

interface ComponentProps {
  data: ItemEstimateType[]
}

export const ItemsTable: FC<ComponentProps> = ({ data = [] }) => {
  const { data: tax } = disptachTax()
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
  const itemsColumns: TableColumnsType<ItemEstimateType> = [
    {
      title: 'Name',
      dataIndex: 'item_name',
      key: 'item_name',
      render: (_, record) => <p className='capitalize'>{record.article?.article_name}</p>,
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'item_price',
      key: 'item_price',
      render: (_, record) => Intl.NumberFormat('en-EN', { style: 'currency', currency: record.article?.article_currency }).format(record.item_price!),
    },
    {
      title: 'Quantity',
      dataIndex: 'item_quantity',
      key: 'item_quantity',
    },
    {
      title: 'Tax Added Value',
      dataIndex: 'item_tax',
      key: 'item_tax',
      render: (item) => `${item}%`,
    },
    {
      title: 'Total',
      align: 'right',
      render: (_, record) => {
        const totalPrice = record.item_price! * record.item_quantity
        const taxAmount = (totalPrice * record.item_tax) / 100
        const totalWithTax = totalPrice + taxAmount
        return Intl.NumberFormat('en-EN', { style: 'currency', currency: record.article?.article_currency }).format(totalWithTax)
      },
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

  return (
    <>
      {contextHolder}
      <Table columns={itemsColumns} dataSource={data} bordered pagination={false} />
    </>
  )
}
