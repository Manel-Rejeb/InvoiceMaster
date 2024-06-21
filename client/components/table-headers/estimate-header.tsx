import { type FC } from 'react'
import Link from 'next/link'

import { DELETE } from '@/actions/estimate-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'

import { Button, message, Table, type TableColumnsType, Popconfirm, Space, Tag } from 'antd/lib'
import { LuFileEdit, LuTrash } from 'react-icons/lu'
import { AiOutlineFileDone } from 'react-icons/ai'

interface ComponentProps {
  isLoading: boolean
  data: EstimateType[]
}

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
      title: 'Start Date',
      dataIndex: 'estimate_date',
      key: 'estimate_date',
      render: (date) => (date ? `${date}`.slice(0, 10) : <Tag color='red'>N/A</Tag>),
    },
    {
      title: 'Expiary Date',
      dataIndex: 'estimate_expiary_date',
      key: 'estimate_expiary_date',
      render: (date) => (date ? `${date}`.slice(0, 10) : <Tag color='red'>N/A</Tag>),
    },
    {
      title: 'Status',
      dataIndex: 'estimate_status',
      key: 'estimate_status',
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
              pathname: '/estimate/preview',
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
