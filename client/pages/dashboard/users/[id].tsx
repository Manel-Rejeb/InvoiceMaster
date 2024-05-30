import { useEffect, useState, type JSX } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, FormRule, Input, Select, Space, Spin, message } from 'antd/lib'
import { FIND, PATCH, POST } from '@/actions/user-actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '@/util/react-query-client'

export default function Users(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: UserFormType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onSuccess: () => push('/dashboard/users'),
    onError: () => {
      message.error(`Could not ${id === 'create' ? 'save' : 'update'} the user. Please try again.`)
    },
  })

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center  mx-auto p-6  overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: UserFormType) => mutate(values)} className='w-full'>
        <Form.Item label='User Name' name='username' className='flex-1' rules={rules.username}>
          <Input placeholder='Enter user name' />
        </Form.Item>

        <Form.Item label='Email' name='email' className='flex-1' rules={rules.email}>
          <Input placeholder='Enter email' />
        </Form.Item>

        <Form.Item label='Password' name='password' className='flex-1' rules={rules.password}>
          <Input placeholder='Enter password' />
        </Form.Item>

        <Form.Item<UserFormType> label='Role' name='role' className='flex-1' rules={rules.role}>
          <Select
            placeholder={'Select your article type'}
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Moderator', value: 'MODERATOR' },
              { label: 'Client', value: 'CLIENT' },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
            <Button type='default' onClick={() => push('/dashboard/users')}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

const rules: {
  email: FormRule[]
  username: FormRule[]
  password: FormRule[]
  role: FormRule[]
} = {
  username: [
    {
      min: 2,
      message: 'Tax name should be at least 2 characters',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ],
  password: [{ required: true, message: 'Please enter password' }],
  role: [{ required: true, message: 'Please select role' }],
}
