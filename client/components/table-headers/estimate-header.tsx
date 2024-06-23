import { type FC } from 'react'
import Link from 'next/link'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { DELETE } from '@/actions/estimate-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'

import { Button, message, Table, type TableColumnsType, Popconfirm, Space, Tag, Avatar } from 'antd/lib'
import { LuFileEdit, LuTrash } from 'react-icons/lu'
import { AiOutlineFileDone } from 'react-icons/ai'

interface ComponentProps {
  isLoading: boolean
  data: EstimateType[]
}

dayjs.extend(localizedFormat)

export const EstimateTable: FC<ComponentProps> = ({ isLoading, data }) => {
  const [messageApi, contextHolder] = message.useMessage()

  // delete mutation
  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['estimates'] })
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
  const estimateColumns: TableColumnsType<EstimateType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Reference',
      dataIndex: 'estimate_reference',
      key: 'estimate_reference',
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <div>{record.customer.customer_type ? <Avatar src={record.customer.corporate.corporate_logo} /> : <Avatar>{record.customer.customer_contact_name[0]}</Avatar>}</div>
          <div className='flex flex-col leading-5'>
            <p>
              {record.customer.customer_contact_name} {record.customer.customer_contact_last_name}
            </p>
            <p>{record.customer.customer_email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'estimate_date',
      key: 'estimate_date',
      render: (date) => (date ? dayjs(date).format('ll') : <Tag color='red'>N/A</Tag>),
      width: '150px',
    },
    {
      title: 'Expiary Date',
      dataIndex: 'estimate_expiary_date',
      key: 'estimate_expiary_date',
      render: (date) => (date ? dayjs(date).format('ll') : <Tag color='red'>N/A</Tag>),
      width: '150px',
    },
    {
      title: 'Status',
      dataIndex: 'estimate_status',
      key: 'estimate_status',
      render: (status) => {
        switch (status) {
          case 'DRAFT':
            return <Tag>Draft</Tag>
          case 'ACCEPTED':
            return <Tag color='green'>Accepted</Tag>
          case 'REJECTED':
            return <Tag color='red'>Rejected</Tag>
          case 'EXPIRED':
            return <Tag color='gray'>Epirted</Tag>
          case 'CONVERTED':
            return <Tag color='blue'>Converted</Tag>
          default:
            return <Tag color='red'>N/A</Tag>
        }
      },
      filters: [
        { text: 'Draft', value: 'DRAFT' },
        { text: 'Accepted', value: 'ACCEPTED' },
        { text: 'Rejected', value: 'REJECTED' },
        { text: 'Expired', value: 'EXPIRED' },
        { text: 'Converted', value: 'CONVERTED' },
      ],
      onFilter: (value, record) => record.estimate_status === value,
    },
    {
      title: 'Total',
      dataIndex: 'estimate_total',
      key: 'estimate_total',
      render: (_, record) => Intl.NumberFormat('fr-TN', { style: 'currency', currency: record.estimate_currency }).format(record.estimate_total),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.length,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id, record) => (
        <Space>
          <Link href={`/dashboard/estimates/${id}`} passHref>
            <Button icon={<LuFileEdit size={18} />} />
          </Link>
          <Popconfirm title='Delete the task' description='Are you sure to delete this task?' okText='Yes' cancelText='No' onConfirm={() => mutate(id)}>
            <Button icon={<LuTrash size={18} />} danger />
          </Popconfirm>
          {/* TODO: TO CHANGE PATH */}
          <Link
            href={{
              pathname: '/dashboard/estimates/preview',
              search: 'ref=' + record.id,
            }}
            passHref>
            <Button icon={<AiOutlineFileDone size={18} />} type='primary' />
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      <Table columns={estimateColumns} rowKey={'id'} dataSource={data} loading={isLoading} bordered size='small' />
    </>
  )
}
