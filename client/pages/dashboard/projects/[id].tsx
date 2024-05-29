import { useEffect, type JSX } from 'react'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from '@tanstack/react-query'
import { FIND, PATCH, POST } from '@/actions/project-actions'
import { queryClient } from '@/util/react-query-client'

import dayjs from 'dayjs'
import { Button, Form, FormRule, Input, Select, Space, Spin, DatePicker, message, Avatar } from 'antd/lib'

import { disptachCustomer } from '@/providers/customer-provider'

export default function Article(): JSX.Element {
  const { data: customer } = disptachCustomer()

  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm<ProjectFormType>()

  const { mutate } = useMutation({
    mutationFn: async (values: ProjectFormType) => {
      if (id === 'create') {
        return POST(values.customer_Id, values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onSuccess: () => push('/dashboard/projects'),
    onError: () => {
      message.error(`Could not ${id === 'create' ? 'save' : 'update'} the project. Please try again.`)
    },
  })

  const { isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
    select: (data) => {
      return form.setFieldsValue({
        ...data,
        project_start_date: dayjs(data.project_start_date),
        project_end_date: dayjs(data.project_end_date),
        customer_Id: data.customer.id,
      })
    },
  })

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto p-6  overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: ProjectFormType) => mutate(values)} className='w-full'>
        <Form.Item label='Project Name' name='project_name' rules={rules.name}>
          <Input placeholder='Enter project name' />
        </Form.Item>

        <Form.Item label='Project Description' name='project_description'>
          <Input.TextArea placeholder='Enter project description' />
        </Form.Item>

        <Form.Item label='Start Date' name='project_start_date'>
          <DatePicker placeholder='Project starting date' className='w-full' />
        </Form.Item>

        <Form.Item label='End Date' name='project_end_date'>
          <DatePicker placeholder='Project ending date' className='w-full' />
        </Form.Item>

        <Form.Item label='Status' name='project_status'>
          <Select
            placeholder='Select project status'
            options={[
              { label: 'Onbording', value: 'ONBORDING' },
              { label: 'Ongoing', value: 'ONGOING' },
              { label: 'On Hold', value: 'ONHOLD', disabled: id === 'create' },
              { label: 'Completed', value: 'COMPLETED', disabled: id === 'create' },
              { label: 'Cancelled', value: 'CANCELLED', disabled: id === 'create' },
            ]}
          />
        </Form.Item>

        <Form.Item label='Customer' name={'customer_Id'} rules={rules.customer}>
          <Select
            placeholder='Select a customer to bill'
            className='h-fit min-h-fit w-full'
            labelRender={(el) => {
              const element = customer?.find((c) => c.id === el.value)
              if (!element) return <></>
              return (
                <div className='flex items-center gap-2 py-1'>
                  <div>{element.customer_type ? <Avatar src={element.corporate.corporate_logo} /> : <Avatar size='large'>{element.customer_contact_name[0]}</Avatar>}</div>
                  <div className='flex flex-col leading-5'>
                    <p>
                      {element.customer_contact_name} {element.customer_contact_last_name}
                    </p>
                    <p className='text-sm'>{element.customer_email}</p>
                  </div>
                </div>
              )
            }}
            options={customer?.map((el) => ({
              label: (
                <div className='flex items-center gap-2'>
                  <div>{el.customer_type ? <Avatar src={el.corporate.corporate_logo} /> : <Avatar size='large'>{el.customer_contact_name[0]}</Avatar>}</div>
                  <div className='flex flex-col leading-5'>
                    <p>
                      {el.customer_contact_name} {el.customer_contact_last_name}
                    </p>
                    <p className='text-sm'>{el.customer_email}</p>
                  </div>
                </div>
              ),
              value: el.id,
            }))}
          />
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

const rules: { name: FormRule[]; percentage: FormRule[]; customer: FormRule[] } = {
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
  customer: [
    {
      required: true,
      message: 'Customer is required',
    },
  ],
}
