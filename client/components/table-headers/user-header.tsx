import { DELETE } from '@/actions/user-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, TableColumnsType, Tag } from 'antd/lib'
import { useRouter } from 'next/router'
import { useAuth } from '@/providers/user-provider'
import { useState, type FC } from 'react'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

interface ComponentProps {
  isLoading: boolean
  data: UserType[]
}

export const UserTable: FC<ComponentProps> = ({ isLoading, data = [] }) => {
  const { user } = useAuth()
  const { push } = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
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
  const userColumns: TableColumnsType<UserType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
      width: '30%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        switch (role) {
          case 'ADMIN':
            return <Tag color='red'>Admin</Tag>
          case 'MODERATOR':
            return <Tag color='green'>Moderator</Tag>
          case 'CLIENT':
            return <Tag color='blue'>Client</Tag>
          default:
            return <Tag color='red'>N/A</Tag>
        }
      },
      filters: [
        { text: 'Moderator', value: 'MODERATOR' },
        { text: 'Client', value: 'CLIENT' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Space>
          <Button icon={<LuFileEdit size={18} />} onClick={() => push(`/dashboard/users/${id}`)} disabled={id === 1} />
          <Popconfirm title='Are you sure to delete this user?' onConfirm={() => mutate(id)} okText='Yes' cancelText='No'>
            <Button icon={<LuTrash size={18} />} danger disabled={id === 1 || user.role !== 'ADMIN'} />
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
        columns={userColumns}
        rowKey={'id'}
        size='small'
        dataSource={data}
        loading={isLoading}
        bordered
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10'],
          showQuickJumper: true,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize, total: pagination.total }),
          style: { padding: '0 24px' },
        }}
      />
    </>
  )
}
