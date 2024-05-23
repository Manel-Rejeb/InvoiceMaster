import { type FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { LuTrash, LuFileEdit } from 'react-icons/lu';

import { useMutation } from '@tanstack/react-query';

import { DELETE } from '@/actions/tax-action';
import { queryClient } from '@/util/react-query-client';

import { message, Button, Tag, Space, Popconfirm, Table, type TableColumnsType, type TableProps } from 'antd/lib';

type TablePaginationConfig = Exclude<TableProps<TaxType>['pagination'], boolean>;

interface ComponentProps {
  isLoading: boolean;
  data: TaxType[];
}

export const TaxTable: FC<ComponentProps> = ({ isLoading, data = [] }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // delete mutation
  const { mutate } = useMutation({
    mutationFn: DELETE,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['taxes'] });
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Item successfully deleted.',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cannot delete this item.',
      });
    },
  });

  // table columns
  const taxColumns: TableColumnsType<TaxType> = [
    Table.EXPAND_COLUMN,
    {
      title: 'Name',
      dataIndex: 'tax_name',
      key: 'tax_name',
      sorter: (a, b) => a.tax_name.toLowerCase().localeCompare(b.tax_name.toLowerCase()),
      width: '30%',
    },
    {
      title: 'Percentage',
      dataIndex: 'tax_percentage',
      key: 'tax_percentage',
      render: (tax_percentage) => <Tag>{tax_percentage}%</Tag>,
      sorter: (a, b) => a.tax_percentage - b.tax_percentage,
      width: '30%',
    },
    {
      title: 'Visibility',
      dataIndex: 'isSoftDelete',
      key: 'isSoftDelete',
      render: (isSoftDelete) => (!isSoftDelete ? <Tag color='green'>Visible</Tag> : <Tag color='red'>Hidden</Tag>),
      filters: [
        { text: 'Visible', value: false },
        { text: 'Hidden', value: true },
      ],
      onFilter: (value, record) => record.isSoftDelete === value,
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Space>
          <Link href={`/dashboard/taxes/${id}`}>
            <Button icon={<LuFileEdit size={18} />} />
          </Link>
          <Popconfirm title='Delete the task' description='Are you sure to delete this task?' okText='Yes' cancelText='No' onConfirm={() => mutate(id)}>
            <Button icon={<LuTrash size={18} />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // table pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
  });

  return (
    <>
      {contextHolder}
      <Table
        bordered
        rowKey='id'
        dataSource={data}
        loading={isLoading}
        columns={taxColumns}
        expandable={{
          expandedRowRender: (record) => (
            <p className='first-letter:uppercase' style={{ margin: 0 }}>
              {record.tax_description}
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
          style: {padding: '0 24px'}
        }}
      />
    </>
  );
};
