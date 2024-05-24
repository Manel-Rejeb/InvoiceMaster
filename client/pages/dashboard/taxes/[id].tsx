import { type JSX, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePercentage } from 'react-icons/ai'
import { Form, Input, InputNumber, Button, FormRule, Space, Spin } from 'antd/lib'

import { POST, FIND, PATCH } from '@/actions/tax-action'
import { queryClient } from '@/util/react-query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function Tax(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: TaxFormType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['taxes'] })
    },
    onSuccess: () => push('/dashboard/taxes'),
    onError: () => {
      alert('Not saved')
    },
  })

  const { data: tax, isLoading } = useQuery({
    queryKey: ['tax', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  useEffect(() => {
    if (tax) {
      form.setFieldsValue(tax)
    }
  }, [tax, form])

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center border shadow-sm mx-auto p-6 rounded-md overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: TaxFormType) => mutate(values)} className='w-full'>
        <Form.Item<TaxFormType> label='Tax Name' name='tax_name' className='flex-1' rules={rules.name}>
          <Input placeholder='tax name' />
        </Form.Item>
        <Form.Item<TaxFormType> label='Tax Percentage' name='tax_percentage' className='flex-1' rules={rules.percentage}>
          <InputNumber addonBefore={<AiOutlinePercentage />} type='number' min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item<TaxFormType> label='Tax Description' name='tax_description'>
          <Input.TextArea placeholder='tax description' />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button type='primary' danger htmlType='submit' onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

const rules: { name: FormRule[]; percentage: FormRule[] } = {
  name: [
    {
      min: 2,
      message: 'Tax name should be at least 2 characters',
    },
    {
      required: true,
      message: 'Tax name is required',
    },
  ],
  percentage: [
    {
      required: true,
      message: 'Tax percentage is required',
    },
    {
      pattern: /^(?:100(?:\.0+)?|\d{1,2}(?:\.\d+)?|0(?:\.\d+)?)$/,
      message: 'Percentage should be between 0 and 100',
    },
  ],
}
