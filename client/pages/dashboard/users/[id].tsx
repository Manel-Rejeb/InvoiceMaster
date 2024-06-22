import { type JSX, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, FormRule, Input, Select, Space, Spin, message, Switch, Typography } from 'antd'

import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH, POST } from '@/actions/user-actions'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useAuth } from '@/providers/user-provider'
import { PrivilegeTableHeader } from '@/components/table-headers/privilege-tableheader'

export default function Users(): JSX.Element {
  const { user } = useAuth()
  const [privileges, setPrivileges] = useState<string[]>([])

  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

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
    password: [id === 'create' ? { required: true, message: 'Please enter password' } : { required: false }],
    role: [{ required: true, message: 'Please select role' }],
  }

  const { mutate } = useMutation({
    mutationFn: async (values: UserFormType) => {
      if (id === 'create') {
        return POST({ ...values, privilege: privileges.join(',') })
      } else {
        return PATCH(id as string, { ...values, privilege: privileges.join(',') })
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

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => FIND(`${id}`),
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  useEffect(() => {
    if (data) {
      setPrivileges(data.privilege.split(','))
      form.setFieldsValue({ ...data })
    }
  }, [data])

  if (id !== 'create' && isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center mx-auto p-6 overflow-hidden'>
      <Form form={form} layout='vertical' onFinish={(values: UserFormType) => mutate(values)} className='w-full'>
        <Form.Item<UserFormType> label='User Name' name='username' className='flex-1' rules={rules.username}>
          <Input placeholder='Enter user name' />
        </Form.Item>

        <Form.Item<UserFormType> label='Email' name='email' className='flex-1' rules={rules.email}>
          <Input placeholder='Enter email' />
        </Form.Item>

        <Form.Item<UserFormType> label='Password' name='password' className='flex-1' rules={rules.password}>
          <Input allowClear placeholder='Enter password' type='password' />
        </Form.Item>

        <Form.Item<UserFormType> label='Role' name='role' className='flex-1' rules={rules.role} initialValue={'MODERATOR'}>
          <Select
            placeholder={'Select your article type'}
            options={[
              { label: 'Moderator', value: 'MODERATOR' },
              { label: 'Client', value: 'CLIENT' },
            ]}
          />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {() =>
            form.getFieldValue('role') === 'MODERATOR' && (
              <Form.Item label='Privilege' name='privilege' required shouldUpdate>
                <PrivilegeTableHeader form={form} privileges={privileges} setPrivileges={setPrivileges} />
              </Form.Item>
            )
          }
        </Form.Item>

        <Space className='mb-6'>
          <Form.Item shouldUpdate className='w-[150px] mb-0'>
            {() => <Typography.Text>Account {form.getFieldValue('isActive') ? 'Active' : 'Blocked'}</Typography.Text>}
          </Form.Item>
          <Form.Item<UserFormType> label='Account locked' valuePropName='checked' name='isActive' noStyle initialValue={true}>
            <Switch />
          </Form.Item>
        </Space>

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
