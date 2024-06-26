import { type FC, useState } from 'react'
import Link from 'next/link'

import { LuFileEdit, LuTrash } from 'react-icons/lu'
import { Button, message, Popconfirm, Space, Table, type TableColumnsType, Tag, Badge, Avatar } from 'antd/lib'

import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'

import { DELETE } from '@/actions/project-actions'

interface ComponentProps {
  isLoading: boolean
  data: ProjectType[]
}

export const ProjectTable: FC<ComponentProps> = ({ isLoading, data = [] }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
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
  const projectColumns: TableColumnsType<ProjectType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Name',
      dataIndex: 'project_name',
      key: 'project_name',
      sorter: (a, b) => a.project_name.toLowerCase().localeCompare(b.project_name.toLowerCase()),
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'project_status',
      key: 'project_status',
      render: (status) => {
        switch (status) {
          case 'ONGOING':
            return <Badge status='processing' text='Ongoing' />
          case 'COMPLETED':
            return <Badge status='success' text='Completed' />
          case 'ONHOLD':
            return <Badge status='warning' text='On Hold' />
          case 'ONBORDING':
            return <Badge status='processing' text='Onboarding' />
          case 'CANCELLED':
            return <Badge status='error' text='Cancelled' />
          default:
            return <Tag color='red'>N/A</Tag>
        }
      },
      filters: [
        { text: 'OnBording', value: 'OnBording' },
        { text: 'Ongoing', value: 'Ongoing' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Cancelled', value: 'Cancelled' },
        { text: 'OnHold', value: 'OnHold' },
      ],
      onFilter: (value, record) => record.project_status === value,
    },
    {
      title: 'Start Date',
      dataIndex: 'project_start_date',
      key: 'project_start_date',
      render: (date) => (date ? `${date}`.slice(0, 10) : <Tag color='red'>N/A</Tag>),
      width: '10%',
    },
    {
      title: 'End Date',
      dataIndex: 'project_end_date',
      key: 'project_end_date',
      render: (date) => (date ? `${date}`.slice(0, 10) : <Tag color='red'>N/A</Tag>),
      width: '10%',
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'customer_email'],
      key: 'customer',
      render: (_, record) =>
        record.customer ? (
          <div className='flex items-center gap-2'>
            <div>{record.customer.customer_type ? <Avatar src={record.customer.corporate.corporate_logo} /> : <Avatar>{record.customer.customer_contact_name[0]}</Avatar>}</div>
            <div className='flex flex-col leading-5'>
              <p>
                {record.customer.customer_contact_name} {record.customer.customer_contact_last_name}
              </p>
              <p>{record.customer.customer_email}</p>
            </div>
          </div>
        ) : (
          <Tag color='red'>N/A</Tag>
        ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Space>
          <Link passHref href={`/dashboard/projects/${id}`}>
            <Button icon={<LuFileEdit size={18} />} />
          </Link>
          <Popconfirm title='Are you sure to delete this project?' onConfirm={() => mutate(id)} okText='Yes' cancelText='No'>
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
        columns={projectColumns}
        rowKey={'id'}
        dataSource={data}
        loading={isLoading}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <p className='first-letter:uppercase' style={{ margin: 0 }}>
              {record.project_description}
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
