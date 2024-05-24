import { type JSX, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Button, FormRule, Space, Spin, Select, Switch, Typography } from 'antd/lib'

import { POST, FIND, PATCH } from '@/actions/article-actions'
import { queryClient } from '@/util/react-query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

import { CURRENCY } from '@/constants/CURRENCY'

export default function Article(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: ArticleFormType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onSuccess: () => push('/dashboard/expenses'),
    onError: () => {
      alert('Not saved')
    },
  })

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  // search select options
  const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  //   check if item is taxeable
  const [taxeable, setTaxeable] = useState<boolean>(false)

  useEffect(() => {
    if (article) {
      form.setFieldsValue(article)
      setTaxeable(article.article_tax_enabled)
    }
  }, [article, form])

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto p-6  overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: ArticleFormType) => mutate({ ...values, article_type: 'EXPENSE', article_tax_enabled: taxeable })} className='w-full'>
        <Form.Item<ArticleFormType> label='Article Name' name='article_name' className='flex-1' rules={rules.name}>
          <Input placeholder='article name' />
        </Form.Item>

        <Form.Item<ArticleFormType> label='Article Description' name='article_description' className='flex-1'>
          <Input.TextArea placeholder='article description' />
        </Form.Item>

        <Form.Item<ArticleFormType> label='Article Buy Price' name='article_buy_price' className='flex-1'>
          <InputNumber placeholder='article buy price' className='w-full' min={0} />
        </Form.Item>

        <Form.Item<ArticleFormType> label='Article Sell Price' name='article_price' className='flex-1' rules={rules.price}>
          <InputNumber placeholder='article price' className='w-full' min={0} />
        </Form.Item>

        <Form.Item<ArticleFormType> label='Article Currency' name='article_currency' className='flex-1'>
          <Select showSearch placeholder={'USD'} filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} />
        </Form.Item>

        <Form.Item<ArticleFormType> label='Article Unit' name='article_unit' className='flex-1'>
          <Select
            placeholder={'Select your article unit'}
            options={[
              { label: 'HOUR', value: 'HOUR' },
              { label: 'DAY', value: 'DAY' },
              { label: 'PROJECT', value: 'PROJECT' },
              { label: 'QUANTITY', value: 'QUANTITY' },
            ]}
          />
        </Form.Item>

        <Form.Item<ArticleFormType> name='article_tax_enabled' className='flex-1'>
          <Typography.Text>Mark as Taxeable</Typography.Text>
          <Switch className='ml-2' checked={taxeable} onChange={(checked) => setTaxeable(checked)}></Switch>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
            <Button type='default' onClick={() => push('/dashboard/expenses')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

const rules: { name: FormRule[]; price: FormRule[] } = {
  name: [
    {
      required: true,
      message: 'This field is required',
    },
  ],
  price: [
    {
      required: true,
      message: 'This field is required',
    },
    {
      type: 'number',
      message: 'This field must be a number',
    },
  ],
}
