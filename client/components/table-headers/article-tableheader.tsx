import {FC} from 'react'

import { useMutation } from '@tanstack/react-query'

import { DELETE } from '@/actions/article-actions'
import { queryClient } from '@/util/react-query-client'
import { Button, Space} from 'antd/lib'
import { message, Popconfirm, Table, TableColumnsType } from 'antd/lib'
import Link from 'next/link'
import { LuFileEdit, LuTrash } from 'react-icons/lu'

interface ComponentProps {
  isLoading: boolean;
  data: ArticleType[];
}

export const ArticleTable:FC<ComponentProps> = ({isLoading, data }) => {
  const [messageApi, contextHolder] = message.useMessage();

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
  });

  // table header
const articleColumns: TableColumnsType<ArticleType> = [
  Table.EXPAND_COLUMN,
  {
    title: 'Name',
    dataIndex: 'article_name',
    key: 'article_name',
    sorter: (a, b) => a.article_name.toLowerCase().localeCompare(b.article_name.toLowerCase()),
    width: '30%',
  },
  {
    title: 'Description',
    dataIndex: 'article_description',
    key: 'article_description',
  },
 
  {
title: 'Type',
dataIndex: 'article_type',
key: 'article_type',
render: (article_type) => (article_type ? 'Service' : 'Product'),
  },  
  {
title: 'Price',
dataIndex: 'article_price',
key: 'article_price',
render: (article_price, record) =>
  Intl.NumberFormat('fr-TN', { style: 'currency', currency:record.article_currency}).format(record.article_price),
  },
  {
title: 'Tax',
dataIndex: 'article_tax',
key: 'article_tax',
render: (article_tax) => `${article_tax.article_tax}%`,
  },
  {
    title: 'Unit',
    dataIndex: 'article_unit',
    key: 'article_unit',
  },
  {
    title: 'Currency',
    dataIndex: 'article_currency',
    key: 'article_currency',
  },
  {
    title:'Action',
    dataIndex:'id',
    key:'id',
    align:'right',
    render:(id)=>(
<Space>
<Link href={`/dashboard/articles/${id}`}>
  <Button icon={<LuFileEdit size={18} />} />
</Link>
<Popconfirm title='Delete the task' description='Are you sure to delete this task?' okText='Yes' cancelText='No' onConfirm={() => mutate(id)}>
  <Button icon={<LuTrash size={18} />} danger />
</Popconfirm>
</Space>
    ),
  },
]
   return(
        
       <>
       {contextHolder}
        <Table columns={articleColumns} rowKey={'id'} dataSource={data} loading={isLoading} bordered />
       </>


    )
}
 
