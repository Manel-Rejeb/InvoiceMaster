import { type ReactNode, type JSX } from 'react'

import { Form, Select, Avatar, DatePicker, Button, Space, FormRule, message, Spin } from 'antd/lib'
import { disptachCustomer } from '@/providers/customer-provider'
import { disptachProject } from '@/providers/project-provider'
import { CURRENCY } from '@/constants/CURRENCY'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FIND, PATCH, POST } from '@/actions/estimate-actions'
import { queryClient } from '@/util/react-query-client'
import dayjs from 'dayjs'

export default function Estimate(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: EstimateFormType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
    onSuccess: () => push('/dashboard/estimates'),
    onError: () => {
      message.error(`Could not ${id === 'create' ? 'save' : 'update'} the estimate. Please try again.`)
    },
  })

  const { isLoading } = useQuery({
    queryKey: ['estimate', id],
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
        estimate_date: dayjs(data.estimate_date),
        estimate_expiary_date: dayjs(data.estimate_expiary_date),
        customer_Id: data.customer.id,
      })
    },
  })

  const { data: customer } = disptachCustomer()
  const { data: project } = disptachProject()

  // search select options
  const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  //   const filterOption = (input: string, option?: { label: ReactNode; value: string }) => (option?.value ?? '').includes(input.toLowerCase())

  if (id !== 'create' && isLoading) {
    return <Spin />
  }
  return (
    <div className='w-full'>
      <Form form={form} layout='vertical' onFinish={(values: EstimateFormType) => mutate({ ...values })} className='w-full'>
        <Form.Item label='Billing Customer' name={['customer', 'id']}>
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

        <Form.Item label='estimate creation date' name='estimate_date'>
          <DatePicker placeholder=' estimate creation date' className='w-full' />
        </Form.Item>

        <Form.Item label='estimate expiary date' name='estimate_expiary_date'>
          <DatePicker placeholder=' estimate expiary date' className='w-full' />
        </Form.Item>

        <Form.Item label='estimate currency' name='estimate_currency' className='flex-1'>
          <Select showSearch placeholder={'USD'} filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} />
        </Form.Item>

        <Form.Item label='Status' name=' estimate_status'>
          <Select
            placeholder='Select a status'
            options={[
              { label: 'Draft', value: 'DRAFT' },
              { label: 'Accepted', value: 'ACCEPTED' },
              { label: 'Rejected', value: 'REJECTED' },
              { label: 'Published', value: 'PUBLISHED', disabled: id === 'create' },
              { label: 'Sent', value: 'SENT', disabled: id === 'create' },
              { label: 'Viewed', value: 'VIEWED', disabled: id === 'create' },
            ]}
          />
        </Form.Item>

        <Form.Item label='Project' name={['project', 'id']}>
          <Select
            placeholder='Select a project'
            className='h-fit min-h-fit w-full'
            labelRender={(el) => {
              const element = project?.find((c) => c.id === el.value)
              if (!element) return <></> // Add a conditional check to return null if 'element' is undefined
              return (
                <div className='flex items-center gap-2 py-1'>
                  <div>{element.project_name}</div>
                </div>
              )
            }}
            options={project?.map((el) => ({
              label: (
                <div className='flex items-center gap-2'>
                  <div>{el.project_name}</div>
                </div>
              ),
              value: el.id,
            }))}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
            <Button type='default' onClick={() => push('/dashboard/estimates')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
