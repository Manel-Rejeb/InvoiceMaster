'use client'

import Link from 'next/link'

import { Form, Input, Checkbox, Typography, Button, message, Space } from 'antd/lib'
import { queryClient } from '@/util/react-query-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/user-provider'

const Auth = () => {
  const { push } = useRouter()

  const { login } = useAuth()
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()

  const { mutate } = useMutation({
    mutationFn: async (values: LoginFormType) => login(values),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onSuccess: () => push('/dashboard'),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Verify you credentials.',
      }),
  })

  return (
    <div className={'w-full h-screen flex'}>
      {contextHolder}
      <div className='bg-white flex-1 flex items-center justify-center flex-col'>
        <div className='w-full flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-[400px]'>
            <div className='text-center'>
              <h1 className='block text-3xl font-bold text-gray-800'>Sign in</h1>
              <p className='mt-1 text-sm text-gray-600'>Enter you credentials to connect to your account.</p>
            </div>

            <div className='mt-8'>
              {/* <!-- Form --> */}
              <Form layout='vertical' size='large' form={form} onFinish={(values: LoginFormType) => mutate(values)} labelCol={{ flex: '32px' }} style={{ maxWidth: 600 }} autoComplete='off'>
                <Form.Item<AuthLogin> label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input />
                </Form.Item>

                <Form.Item<AuthLogin> label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item<AuthLogin> name='remember' valuePropName='checked' className='flex-1'>
                  <Space>
                    <Checkbox className='mr-2' checked />
                    <Typography.Text>Remember me.</Typography.Text>
                  </Space>
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' className='w-full'>
                    Submit
                  </Button>
                </Form.Item>

                <div className='flex flex-col'>
                  <Link passHref href={'/auth/reset-password'} className='w-full text-sm capitalize text-end text-blue-600'>
                    forget password ?
                  </Link>
                </div>
              </Form>
              {/* <!-- End Form --> */}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-500 flex-1 flex items-center justify-center bg-[url(/assets/bg-auth-image.png) bg-no-repeat bg-cover bg-center'>
        <img className='w-[70%]' alt='auth-image' src='assets/auth-screens.png' />
      </div>
    </div>
  )
}

export default Auth
