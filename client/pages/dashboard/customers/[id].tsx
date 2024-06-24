import { type JSX, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { FormRule, Form, Spin, Switch, Typography, Space, Input, InputNumber, Select, Button, Upload } from 'antd/lib'
import { LuUploadCloud } from 'react-icons/lu'

import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH, POST } from '@/actions/customer-actions'
import { useMutation, useQuery } from '@tanstack/react-query'

import { COUNTRY } from '@/constants/COUNTRY'

export default function Customer(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()
  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: CustomerFormType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onSuccess: () => push('/dashboard/customers'),
    onError: () => {
      alert('not saved')
    },
  })

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  // decide if the customer is corporate or individual
  const [isCorporate, setIsCorporate] = useState<boolean>(false)
  // search select options
  const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer)
      setIsCorporate(customer.customer_type)
    }
  }, [customer, form])

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto p-6  overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: CustomerFormType) => mutate({ ...customer, ...values, customer_type: isCorporate })} className='w-full'>
        <Space>
          <Typography.Text>Individual</Typography.Text>
          <Switch
            onChange={(checked) => {
              setIsCorporate(checked)
              form.setFieldsValue({ corporate: {} })
            }}
            checked={isCorporate}
          />
          <Typography.Text>Corporate</Typography.Text>
        </Space>
        <div className='h-6' />
        <Form.Item label='Email' name='customer_email' className='flex-1' rules={rules.email}>
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item label={isCorporate ? 'Corporate Name' : 'Contact Name'} name='customer_contact_name' className='flex-1' rules={rules.name}>
          <Input placeholder={isCorporate ? 'Corporate Name' : 'Contact Name'} />
        </Form.Item>

        {!isCorporate && (
          <Form.Item label='Contact Last Name' name='customer_contact_last_name' className='flex-1'>
            <Input placeholder='Contact Last Name' />
          </Form.Item>
        )}

        <Form.Item label='Phone' name='customer_phone' className='flex-1' rules={rules.phone}>
          <InputNumber
            placeholder='Phone'
            className='w-full'
            addonBefore={<Select showSearch placeholder={'+1'} style={{ width: 82 }} options={COUNTRY.map((el) => ({ label: el.dial_code, value: el.dial_code }))} filterOption={filterOption} />}
          />
        </Form.Item>

        <Form.Item label='Country' name='customer_country' className='flex-1'>
          <Select showSearch optionFilterProp='children' placeholder='Select a Country' options={COUNTRY.map((el) => ({ label: el.name, value: el.name.toLowerCase() }))} filterOption={filterOption} />
        </Form.Item>

        <Form.Item label='City' name='customer_city' className='flex-1'>
          <Input placeholder='City' />
        </Form.Item>

        <Form.Item label='Address' name='customer_address' className='flex-1'>
          <Input placeholder='Address' />
        </Form.Item>

        <Form.Item label='Zip' name='customer_zip' className='flex-1'>
          <Input placeholder='Zip' />
        </Form.Item>

        {isCorporate && (
          <>
            {id !== 'create' && (
              <Form.Item hidden name={['corporate', 'id']} className='flex-1'>
                <Input hidden disabled />
              </Form.Item>
            )}

            <Form.Item label='Corporate TIN' name={['corporate', 'corporate_TIN']} className='flex-1' rules={rules.corporate_TIN}>
              <Input placeholder='Corporate TIN' />
            </Form.Item>

            <Form.Item label='Corporate Industry' name={['corporate', 'corporate_industry']} className='flex-1' rules={rules.corporate_industry}>
              <Input placeholder='Corporate Industry' />
            </Form.Item>

            <Form.Item label='Corporate Website' name={['corporate', 'corporate_website']} className='flex-1' rules={rules.corporate_website}>
              <Input placeholder='Corporate Website' />
            </Form.Item>

            <Form.Item label='Corporate Type' name={['corporate', 'corporate_type']} className='flex-1' rules={rules.corporate_type}>
              <Select
                placeholder='Select a Corporate Type'
                options={[
                  { value: 'CORPORATION', label: 'CORPORATION' },
                  { value: 'PARTNERSHIP', label: 'PARTNERSHIP' },
                  { value: 'NON_PROFIT', label: 'NON_PROFIT' },
                  { value: 'COOPERATIVE', label: 'COOPERATIVE' },
                  { value: 'STARTUP', label: 'STARTUP' },
                  { value: 'SOLE_PROPRIETORSHIP', label: 'SOLE_PROPRIETORSHIP' },
                  { value: 'OTHERS', label: 'OTHERS' },
                ]}
              />
            </Form.Item>

            {/* <Form.Item
              label='Upload'
              valuePropName=''
              getValueFromEvent={(e: any) => {
                if (e && e.fileList && e.fileList.length > 0) {
                  form.setFieldsValue({ corporate: { corporate_logo: e.fileList[0].originFileObj } })
                  return e.fileList[0].originFileObj
                }
                return null // or whatever default value you want
              }}>
              <Upload action='http://localhost:7080/file/upload' listType='picture' maxCount={1}>
                <Button icon={<LuUploadCloud />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item> */}
          </>
        )}

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

const rules: {
  email: FormRule[]
  name: FormRule[]
  phone: FormRule[]

  corporate_TIN: FormRule[]
  corporate_industry: FormRule[]
  corporate_website: FormRule[]
  corporate_type: FormRule[]
} = {
  email: [
    {
      required: true,
      message: 'Please input your email!',
    },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
  name: [
    {
      required: true,
      message: 'Please input your name!',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Please input your phone number!',
    },
    {
      pattern: new RegExp(/^[0-9\b]+$/),
      message: 'The input is not valid phone number!',
    },
  ],

  corporate_TIN: [
    {
      required: true,
      message: 'Please input your Corporate TIN!',
    },
    {
      len: 12,
      message: 'The Corporate TIN should be 12 characters!',
    },
  ],
  corporate_industry: [
    {
      required: true,
      message: 'Please input your Corporate Industry!',
    },
  ],
  corporate_website: [
    {
      required: true,
      message: 'Please input your Corporate Website!',
    },
    {
      type: 'url',
      message: 'The input is not valid URL!',
    },
  ],
  corporate_type: [
    {
      required: true,
      message: 'Please select your Corporate Type!',
    },
  ],
}
