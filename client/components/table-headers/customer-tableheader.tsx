import { type FC } from 'react'
import { DELETE } from '@/actions/customer-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'
import { Button, message, Table, TableColumnsType } from 'antd/lib'
import { Popconfirm, Space } from 'antd/lib'
import Link from 'next/link'
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
      title:'id',
      dataIndex:'id',
      key:'id',

    },
    {
      title: 'Reference',
      dataIndex: 'customer_reference',
      key: 'customer_reference',
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
      render: (type_customer) => (type_customer ? 'Corporate' : 'Individual'),
    },
    {
      title: 'Address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Phone number',
      dataIndex: 'customer_number',
      key: 'customer_number',
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
