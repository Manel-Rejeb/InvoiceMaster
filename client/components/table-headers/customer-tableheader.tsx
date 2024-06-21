import { type FC } from 'react'
import Link from 'next/link'

import { DELETE } from '@/actions/customer-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'

import { Button, message, Table, type TableColumnsType, Popconfirm, Space, Tag } from 'antd/lib'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

interface ComponentProps {
  isLoading: boolean
  data: CustomerType[]
}

export const CustomerTable: FC<ComponentProps> = ({ isLoading, data }) => {
  const [messageApi, contextHolder] = message.useMessage()

  // delete mutation
  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onSuccess: () =>
      messageApi.open({
        type: 'success',
        content: 'Item successfully delete.',
      }),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Can not delete this item.',
      }),
  })

  // table header
  const customerColumns: TableColumnsType<CustomerType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Reference',
      dataIndex: 'customer_reference',
      key: 'customer_reference',
    },
    {
      title: 'Name',
      dataIndex: 'customer_contact_name',
      key: 'customer_contact_name',
    },
    {
      title: 'email',
      dataIndex: 'customer_email',
      key: 'customer_email',
    },
    {
      title: 'Type',
      dataIndex: 'customer_type',
      key: 'customer_type',
      render: (type_customer) => (type_customer ? <Tag color='blue'>Corporate</Tag> : <Tag color='purple'>Individual</Tag>),
    },
    {
      title: 'address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Space>
          <Link href={`/dashboard/customers/${id}`}>
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
      <Table columns={customerColumns} rowKey={'id'} dataSource={data} loading={isLoading} bordered />
    </>
  )
}
