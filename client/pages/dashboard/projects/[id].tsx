import { useEffect, type JSX } from 'react'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from '@tanstack/react-query'
import { FIND, PATCH, POST } from '@/actions/project-actions'
import { queryClient } from '@/util/react-query-client'

import moment from 'moment'
import { Button, Form, FormRule, Input, Select, Space, Spin, DatePicker } from 'antd/lib'

export default function Article(): JSX.Element {
  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: ProjectFormType) => {
      if (id === 'create') {
        return POST('17', values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onSuccess: () => push('/dashboard/projects'),
    onError: () => {
      alert('Not saved')
    },
  })

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        project_start_date: project.project_start_date ? moment(project.project_start_date) : undefined,
        project_end_date: project.project_end_date ? moment(project.project_end_date) : undefined,
      })
    }
  }, [project, form])

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='bg-white h-full w-full flex flex-col items-center border shadow-sm mx-auto p-6 rounded-md overflow-hidden'>
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
