import React, { FC, useEffect, useMemo, useState } from 'react'
import { LuTrash } from 'react-icons/lu'
import { Button, Popconfirm, Table, TableColumnsType, InputNumber, Select, type FormInstance } from 'antd'
import { disptachTax } from '@/providers/tax-provider'
import { disptachArticle } from '@/providers/article-provider'
import { AiOutlinePlus } from 'react-icons/ai'

interface ComponentProps {
  form: FormInstance
  items: ItemEstimateType[]
  setItems: (value: ItemEstimateType[]) => void
}

export const ItemsTable: FC<ComponentProps> = ({ form, items, setItems }) => {
  const filterOption = (input: string, option?: { label: string; value: string | number }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const { data: article } = disptachArticle()
  const { data: tax } = disptachTax()

  const articleOptions = useMemo(
    () =>
      article?.map((el) => ({
        label: `${el.article_name.toLocaleUpperCase()} - ${el.article_type}`,
        value: el.id,
      })) || [],
    [article]
  )

  const taxOptions = useMemo(
    () =>
      tax?.map((el) => ({
        label: `${el.tax_percentage}%`,
        value: el.tax_percentage,
      })) || [],
    [tax]
  )

  useEffect(() => {
    form.setFieldValue('items', items)
  }, [items])

  const handleArticleChange = (value: number, index: number) => {
    const newItems = [...items]
    const selectedArticle = article.find((el) => el.id === value)
    newItems[index].article = selectedArticle
    newItems[index].item_price = selectedArticle?.article_price || 0
    setItems(newItems)
  }

  const handleFieldChange = (field: keyof ItemEstimateType, value: number, index: number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    const newItems = [
      ...items,
      {
        id: items.length,
        item_price: 0,
        item_quantity: 1,
        item_tax: 0,
        article: undefined,
      },
    ]
    setItems(newItems)
  }

  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))

  const itemsColumns: TableColumnsType<ItemEstimateType> = [
    {
      title: 'Article',
      dataIndex: ['article', 'id'],
      key: 'article.id',
      render: (_, record, index) => (
        <Select allowClear showSearch options={articleOptions} value={record.article?.id} className='w-full' filterOption={filterOption} onChange={(value) => handleArticleChange(value, index)} />
      ),
      width: '55%',
    },
    {
      title: 'Price',
      dataIndex: 'item_price',
      key: 'item_price',
      render: (_, record, index) => <InputNumber min={0} value={record.item_price} onChange={(value) => handleFieldChange('item_price', value!, index)} />,
      width: '10%',
    },
    {
      title: 'Quantity',
      dataIndex: 'item_quantity',
      key: 'item_quantity',
      render: (_, record, index) => (
        <InputNumber min={1} value={record.item_quantity} addonAfter={record.article?.article_unit} onChange={(value) => handleFieldChange('item_quantity', value!, index)} />
      ),
      width: '15%',
    },
    {
      title: 'Tax',
      dataIndex: 'item_tax',
      key: 'item_tax',
      render: (_, record, index) => (
        <Select options={taxOptions} value={record.item_tax} disabled={!record.article?.article_tax_enabled} className='w-full' onChange={(value) => handleFieldChange('item_tax', value, index)} />
      ),
      width: '10%',
    },
    {
      title: 'Total',
      align: 'right',
      render: (_, __, index) => {
        const price = items[index].item_price || 0
        const quantity = items[index].item_quantity || 1
        const taxValue = items[index].item_tax || 0
        const taxAmount = (price * taxValue) / 100
        const totalWithTax = (price + taxAmount) * quantity
        const currency = items[index].article?.article_currency || 'USD'
        return Intl.NumberFormat('fr-TN', {
          style: 'currency',
          currency: currency,
        }).format(totalWithTax)
      },
      width: '10%',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'right',
      render: (_, __, index) => (
        <Popconfirm title='Delete the item' description='Are you sure to delete this item?' okText='Yes' cancelText='No' onConfirm={() => removeItem(index)}>
          <Button icon={<LuTrash size={18} />} danger />
        </Popconfirm>
      ),
      width: '10%',
    },
  ]

  return (
    <div>
      <Table size='small' columns={itemsColumns} dataSource={items} bordered pagination={false} rowKey={'id'} />
      <Button type='text' block onClick={addItem}>
        <div className='flex items-center justify-center gap-2'>
          <AiOutlinePlus />
          <p>Add Item</p>
        </div>
      </Button>
    </div>
  )
}
