import { useRouter } from 'next/router'
import { Button, Form, FormRule, Input, InputNumber, Select, Space, Switch, Typography, Upload } from 'antd/lib'

import { COUNTRY } from '@/constants/COUNTRY'
import { LuUploadCloud } from 'react-icons/lu'

import { PATCH, POST } from '@/actions/settings-actions'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/util/react-query-client'

import { disptachSettings } from '@/providers/setting-provider'

export default function Settings(): JSX.Element {
  const { data } = disptachSettings()

  const { push } = useRouter()

  const [form] = Form.useForm()

  // search select options
  const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const { mutate } = useMutation({
    mutationFn: async (values: OrgaConfig) => {
      if (!data) {
        return POST(values)
      } else {
        return PATCH(data.id, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onSuccess: () => push('/dashboard/settings'),
    onError: () => {
      alert('Not saved')
    },
  })

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto p-6  overflow-hidden'>
      <Form form={form} initialValues={data} layout='vertical' onFinish={(values: OrgaConfig) => mutate(values)} className='w-full'>
        <div className='h-6' />
        <Form.Item label={'Organization Name'} name='organization_name' className='flex-1' rules={rules.organization_name}>
          <Input placeholder={'Name'} />
        </Form.Item>

        <Form.Item label='Email' name='organization_email' className='flex-1' rules={rules.organization_email}>
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item label='Phone' name='organization_phone' className='flex-1' rules={rules.phone}>
          <InputNumber
            placeholder='Phone'
            className='w-full'
            addonBefore={<Select showSearch placeholder={'+1'} style={{ width: 82 }} options={COUNTRY.map((el) => ({ label: el.dial_code, value: el.dial_code }))} filterOption={filterOption} />}
          />
        </Form.Item>

        <Form.Item label=' Country' name='organization_country' className='flex-1'>
          <Select showSearch optionFilterProp='children' placeholder='Select a Country' options={COUNTRY.map((el) => ({ label: el.name, value: el.name.toLowerCase() }))} filterOption={filterOption} />
        </Form.Item>

        <Form.Item label='City' name='organization_city' className='flex-1'>
          <Input placeholder='City' />
        </Form.Item>

        <Form.Item label='Address' name='organization_address' className='flex-1'>
          <Input placeholder='Address' />
        </Form.Item>

        <Form.Item label='Zip' name='organization_zip' className='flex-1'>
          <Input placeholder='Zip' />
        </Form.Item>

        <Form.Item label='Organization TIN' name={'organization_TIN'} className='flex-1' rules={rules.organization_TIN}>
          <Input placeholder='Corporate TIN' />
        </Form.Item>

        <Form.Item label='Organization Industry' name={'organization_industry'} className='flex-1' rules={rules.organization_industry}>
          <Input placeholder='Corporate Industry' />
        </Form.Item>

        <Form.Item label='Organization Website' name={'organization_website'} className='flex-1' rules={rules.organization_website}>
          <Input placeholder='Corporate Website' />
        </Form.Item>

        {/* <Form.Item
          label='Upload'
          valuePropName='fileList'
          getValueFromEvent={(e: any) => {
            if (e && e.fileList && e.fileList.length > 0) {
              form.setFieldsValue({ corporate: { corporate_logo: e.fileList[0].originFileObj } })
              console.log('file')
              return e.fileList[0].originFileObj
            }
            return null // or whatever default value you want
          }}>
          <Upload action='http://localhost:7080/file/upload' listType='picture' maxCount={1}>
            <Button icon={<LuUploadCloud />}>Upload (Max: 1)</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const rules: {
  organization_name: FormRule[]
  organization_email: FormRule[]
  phone: FormRule[]

  organization_TIN: FormRule[]
  organization_industry: FormRule[]
  organization_website: FormRule[]
  organization_type: FormRule[]
} = {
  organization_email: [
    {
      required: true,
      message: 'Please input your email!',
    },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
  organization_name: [
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

  organization_TIN: [
    {
      required: true,
      message: 'Please input your Corporate TIN!',
    },
    {
      len: 9,
      message: 'The Corporate TIN should be 12 characters!',
    },
  ],
  organization_industry: [
    {
      required: true,
      message: 'Please input your Corporate Industry!',
    },
  ],
  organization_website: [
    {
      required: true,
      message: 'Please input your Corporate Website!',
    },
    {
      type: 'url',
      message: 'The input is not valid URL!',
    },
  ],
  organization_type: [
    {
      required: true,
      message: 'Please select your Corporate Type!',
    },
  ],
}
