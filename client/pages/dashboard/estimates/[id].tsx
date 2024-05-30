import { type JSX, type ChangeEvent, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CURRENCY } from '@/constants/CURRENCY'
import { ItemsTable } from '@/components/table-headers/item-tableheader'
import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH, POST } from '@/actions/estimate-actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Select, Avatar, DatePicker, Button, Space, message, Input, Spin, InputNumber, Switch } from 'antd/lib'
import { disptachCustomer } from '@/providers/customer-provider'
import { disptachProject } from '@/providers/project-provider'
import { disptachTax } from '@/providers/tax-provider'
import { disptachArticle } from '@/providers/article-provider'

export default function Estimate(): JSX.Element {
  const { data: customer } = disptachCustomer()
  const { data: project } = disptachProject()
  const { data: tax } = disptachTax()
  const { data: article } = disptachArticle()

  const {
    query: { id },
    push,
  } = useRouter()

  const [form] = Form.useForm()

  // mutations
  const { mutate } = useMutation({
    mutationFn: async (values: EstimateFormType) => {
      if (id === 'create') {
        return POST({ ...values, items: items })
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

  // search select options
  const filterOption = (input: string, option?: { label: string; value: string | number }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const [note, setNote] = useState<string>()
  const [item, setItem] = useState<ItemEstimateType>({
    id: 0,
    item_price: 0,
    item_quantity: 1,
    item_tax: 0,
    article: undefined,
  })

  // Define a state to hold the items
  const [items, setItems] = useState<ItemEstimateType[]>([])

  // fetching when updating the value of id
  const { isLoading } = useQuery({
    queryKey: ['estimate', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(id as string)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
    select: (data) => {
      setItems(data.items)
      return form.setFieldsValue({
        ...data,
        estimate_date: dayjs(data.estimate_date),
        estimate_expiary_date: dayjs(data.estimate_expiary_date),
      })
    },
  })

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='w-full'>
      <Form form={form} layout='vertical' onFinish={(values: EstimateFormType) => mutate({ ...values })} className='w-full'>
        {/* customer */}
        <Form.Item label='Billing Customer' name={['customer', 'id']}>
          <Select
            allowClear
            placeholder='Select a customer to bill'
            className='h-fit min-h-fit w-full'
            labelRender={(el) => {
              const element = customer?.find((c) => c.id === el.value)
              if (!element) return <></>
              return (
                <div className='flex items-center gap-2 py-1'>
                  <div>{element.customer_type ? <Avatar src={element.corporate.corporate_logo} /> : <Avatar>{element.customer_contact_name[0]}</Avatar>}</div>
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
                  <div>{el.customer_type ? <Avatar src={el.corporate.corporate_logo} /> : <Avatar>{el.customer_contact_name[0]}</Avatar>}</div>
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

        {/* project */}
        <Form.Item label='Project' name={['project', 'id']}>
          <Select
            allowClear
            placeholder='Select a project'
            className='h-fit min-h-fit w-full'
            options={project?.map((el) => ({
              label: el.project_name,
              value: el.id,
            }))}
          />
        </Form.Item>

        {/* dates */}
        <Space>
          <Form.Item label='estimate creation date' name='estimate_date'>
            <DatePicker placeholder=' estimate creation date' className='w-full' />
          </Form.Item>

          <Form.Item label='estimate expiary date' name='estimate_expiary_date'>
            <DatePicker placeholder=' estimate expiary date' className='w-full' />
          </Form.Item>
        </Space>

        {/* currency */}
        <Form.Item label='estimate currency' name='estimate_currency' className='flex-1'>
          <Select showSearch allowClear placeholder={'USD'} filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} />
        </Form.Item>

        {/* discount */}
        <Space>
          <Form.Item label='estimate discount' name='estimate_discount'>
            <InputNumber
              placeholder='0.00'
              className='w-full'
              addonAfter={
                <Form.Item className='m-0'>
                  <Select
                    style={{ width: 62 }}
                    defaultValue={true}
                    options={[
                      { label: '%', value: true },
                      { label: '*', value: false },
                    ]}
                  />
                </Form.Item>
              }
            />
          </Form.Item>
        </Space>

        {/* item */}
        <div className='mb-10'>
          <div>
            <ItemsTable data={items} />
          </div>
          <Space>
            <Select
              showSearch
              allowClear
              placeholder='select an article'
              filterOption={filterOption}
              options={article?.map((el) => ({ label: el.article_name, value: el.id }))}
              onChange={(value) => setItem({ ...item, item_price: article.find((el) => el.id === value)?.article_price, article: article.find((el) => el.id === value) })}
            />
            <InputNumber
              min={0}
              placeholder='item price'
              addonAfter={item.article?.article_currency}
              defaultValue={item.article?.article_price ?? undefined}
              onChange={(value) => setItem({ ...item, item_price: value ? value : 0 })}
            />
            <InputNumber placeholder='item quantity' min={1} defaultValue={1} onChange={(value) => setItem({ ...item, item_price: value ? value : 1 })} />
            <Select
              allowClear
              showSearch
              filterOption={filterOption}
              placeholder='Select a tax'
              className='h-fit min-h-fit w-full'
              options={tax?.map((el) => ({
                label: `${el.tax_name.toLocaleUpperCase()} - ${el.tax_percentage}%`,
                value: `${el.tax_percentage}`,
              }))}
              onChange={(value) => setItem({ ...item, item_tax: value })}
            />
            <Button
              onClick={() => {
                // const currentItems = form.getFieldValue('items') || []
                // const updatedItems = [...currentItems, item]
                setItems([...items, item])
                // form.setFieldsValue({ items: updatedItems })
                setItem({
                  id: 0,
                  item_price: 0,
                  item_quantity: 1,
                  item_tax: 0,
                  article: undefined,
                })
              }}>
              Add item
            </Button>
          </Space>
        </div>

        {/* notes */}
        <Space>
          <Input.TextArea placeholder='Add some notes' className='w-full' value={note} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)} />
          <Button
            onClick={() => {
              const currentNotes = form.getFieldValue('estimate_notes') || []
              const updatedNotes = [...currentNotes, note]
              form.setFieldsValue({ estimate_notes: updatedNotes })
              setNote('')
            }}>
            Add
          </Button>
        </Space>
        {form.getFieldValue('estimate_notes') && <div>{JSON.stringify(form.getFieldValue('estimate_notes'))}</div>}

        {/* status */}
        <Form.Item label='Status' name='estimate_status'>
          <Select
            placeholder='Select a status'
            options={[
              { label: 'Draft', value: 'DRAFT' },
              { label: 'Accepted', value: 'ACCEPTED' },
              { label: 'Rejected', value: 'REJECTED' },
              { label: 'Published', value: 'PUBLISHED' },
              { label: 'Sent', value: 'SENT' },
              { label: 'Viewed', value: 'VIEWED' },
            ]}
          />
        </Form.Item>

        {/* tax */}
        <Form.Item label='estimate tax' name='estimate_tax'>
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            placeholder='Select a tax'
            className='h-fit min-h-fit w-full'
            options={tax?.map((el) => ({
              label: `${el.tax_name.toLocaleUpperCase()} - ${el.tax_percentage}%`,
              value: `${el.tax_percentage}`,
            }))}
          />
        </Form.Item>

        {/* enabled! */}
        <Form.Item label='estimate tax per item enabled' name='estimate_tax_per_item_enabled'>
          <Switch />
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
