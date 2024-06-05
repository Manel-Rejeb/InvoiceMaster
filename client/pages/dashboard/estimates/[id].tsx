import { type JSX, type ChangeEvent, useState } from 'react'

import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { CURRENCY } from '@/constants/CURRENCY'
import { app } from '@/constants/APP'

import { ItemsTable } from '@/components/table-headers/item-tableheader'

import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH, POST } from '@/actions/estimate-actions'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Form, Select, Avatar, DatePicker, Button, Space, message, Input, Spin, InputNumber, Switch } from 'antd/lib'
import { AiOutlineSave } from 'react-icons/ai'

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

  const customerWatcher = Form.useWatch(['customer', 'id'], form)
  const Customer = () => (
    <Form.Item name={['customer', 'id']}>
      <Select
        allowClear
        showSearch
        placeholder='Select a customer to bill'
        className='h-fit min-h-fit w-full'
        options={customer?.map((el) => ({
          label: el.customer_email,
          value: el.id,
        }))}
        filterOption={filterOption}
      />
    </Form.Item>
  )

  const projectWatcher = Form.useWatch(['project', 'id'], form)
  const Project = () => (
    <Form.Item name={['project', 'id']}>
      <Select
        allowClear
        showSearch
        placeholder='Select a project'
        className='h-fit min-h-fit w-full'
        options={project?.map((el) => ({
          label: el.project_name,
          value: el.id,
        }))}
        filterOption={filterOption}
      />
    </Form.Item>
  )

  const Currency = () => (
    <Form.Item label='Invoice Currency' name='estimate_currency' className='m-0'>
      <Select showSearch allowClear placeholder={'USD'} filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} />
    </Form.Item>
  )

  const InvoiceItemsAreTaxable = () => (
    <Form.Item label='Tax per item enabled' name='estimate_tax_per_item_enabled'>
      <Switch />
    </Form.Item>
  )

  const DueDate = () => (
    <Form.Item label='Due Date' name='estimate_expiary_date' className='m-0'>
      <DatePicker placeholder='Due date' className='w-full' />
    </Form.Item>
  )

  const Status = () => (
    <Form.Item label='Invoice Status' name='estimate_status' className='m-0'>
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
  )

  const Discount = () => (
    <Form.Item label='Estimate discount' name='estimate_discount' className='m-0'>
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
                { label: '$', value: false },
              ]}
            />
          </Form.Item>
        }
      />
    </Form.Item>
  )

  const Tax = () => (
    <Form.Item label='Estimate tax' name='estimate_tax' className='m-0'>
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
  )

  const Items = () => {
    const [item, setItem] = useState<ItemEstimateType>({
      id: 0,
      item_price: 0,
      item_quantity: 1,
      item_tax: 0,
      article: undefined,
    })

    return (
      <div>
        <div>
          <ItemsTable data={items} />
        </div>
        <div className='grid grid-cols-5 gap-2 p-2'>
          <Select
            showSearch
            allowClear
            placeholder='select an article'
            filterOption={filterOption}
            options={article?.map((el) => ({ label: el.article_name, value: el.id }))}
            onChange={(value) =>
              setItem({
                ...item,
                item_price: article.find((el) => el.id === value)?.article_price,
                article: article.find((el) => el.id === value),
              })
            }
          />
          <InputNumber
            min={0}
            placeholder='Price'
            addonAfter={item.article?.article_currency}
            defaultValue={item.article?.article_price ?? undefined}
            onChange={(value) => setItem({ ...item, item_price: value ? value : 0 })}
            className='w-full'
          />
          <InputNumber placeholder='Quantity' min={1} defaultValue={1} onChange={(value) => setItem({ ...item, item_quantity: value ? value : 1 })} className='w-full' />
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            placeholder='Tax'
            className='h-fit min-h-fit w-full'
            options={tax?.map((el) => ({
              label: `${el.tax_name.toLocaleUpperCase()} - ${el.tax_percentage}%`,
              value: `${el.tax_percentage}`,
            }))}
            onChange={(value) => setItem({ ...item, item_tax: value ? value : 0 })}
          />
          <Button
            onClick={() => {
              setItems([item, ...items])
            }}>
            Add item
          </Button>
        </div>
      </div>
    )
  }

  const Notes = () => (
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
  )

  if (id !== 'create' && isLoading) {
    return <Spin />
  }

  return (
    <div className='max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4'>
      <Form form={form} labelCol={{ span: 8 }} labelAlign='left' onFinish={(values: EstimateFormType) => mutate({ ...values })} className='w-full'>
        <div className='mb-5 pb-5 flex justify-between items-center border-b border-gray-200'>
          <div>
            <h2 className='text-2xl font-semibold text-gray-800'>Invoice</h2>
          </div>
          <div className='inline-flex gap-x-2'>
            <DueDate />
            <Button>Invoice PDF</Button>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                <div className='flex items-center gap-2'>
                  <AiOutlineSave />
                  <p>Save to Draft</p>
                </div>
              </Button>
            </Form.Item>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-3'>
          <div>
            <Image src={app.logo} alt='visto logo image' width={100} height={100} />
          </div>
          <div>
            <Customer />
          </div>
          <div>
            <Project />
          </div>

          {/* me orga preview */}
          <div>
            <div className='flex gap-x-3 text-sm'>
              <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>From:</div>
              <div className='font-medium text-gray-800 dark:text-neutral-200'>
                <span className='block font-semibold capitalize'>{app.name}</span>
                <div className='not-italic font-normal'>{app.email}</div>
                <div className='not-italic font-normal'>
                  {app.detail.adress.street} - {app.detail.adress.city} - {app.detail.adress.zip}
                </div>
              </div>
            </div>
            <div className='flex gap-x-3 mt-6 text-sm'>
              <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>Bank:</div>
              <div className='font-medium text-gray-800 dark:text-neutral-200'>
                <span className='block font-semibold capitalize'>{app.detail.bank.name}</span>
                <div className='not-italic font-normal'>{app.detail.bank.BIC}</div>
                <div className='not-italic font-normal'>{app.detail.bank.IBAN}</div>
              </div>
            </div>

            <div className='flex gap-x-3 mt-6 text-sm'>
              <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>Tax ID Number:</div>
              <div className='font-medium text-gray-800 dark:text-neutral-200'>
                <div className='not-italic font-normal'>{app.detail.TIN}</div>
              </div>
            </div>
          </div>

          {/* customer preview */}
          <div className='grid sm:flex gap-x-3 text-sm'>
            <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>{customerWatcher && 'Billing details:'}</div>
            <div className='font-medium text-gray-800 dark:text-neutral-200'>
              <span className='block font-semibold'>
                {customer.find((el) => el.id === customerWatcher)?.customer_contact_name} {customer.find((el) => el.id === customerWatcher)?.customer_contact_last_name}
              </span>
              <div className='not-italic font-normal'>{customer.find((el) => el.id === customerWatcher)?.customer_address}</div>
              {customerWatcher && (
                <div className='not-italic font-normal'>
                  {customer.find((el) => el.id === customerWatcher)?.customer_zip} - {customer.find((el) => el.id === customerWatcher)?.customer_city} -
                  {customer.find((el) => el.id === customerWatcher)?.customer_country}
                </div>
              )}
              <div className='not-italic font-normal'>{customer.find((el) => el.id === customerWatcher)?.customer_phone}</div>
            </div>
          </div>

          {/* project preview */}
          <div className='grid sm:flex gap-x-3 text-sm'>
            <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>{projectWatcher && 'Folder details:'}</div>
            <div className='font-medium text-gray-800 dark:text-neutral-200'>
              <span className='block font-semibold'>{project.find((el) => el.id === projectWatcher)?.project_name}</span>
              <div className='not-italic font-normal'>{project.find((el) => el.id === projectWatcher)?.project_status}</div>
            </div>
          </div>
        </div>

        <div className='mt-6 border border-gray-200 rounded-lg space-y-4'>
          <Items />
        </div>

        <div className='flex items-start justify-between mt-8'>
          <div className='flex flex-col gap-1'>
            <Currency />
            {id !== 'create' && <Status />}
            <Discount />
            <Tax />
          </div>
          <div className='flex sm:justify-end'>
            <div className='w-full max-w-2xl sm:text-end space-y-2'>
              <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
                <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                  <dt className='col-span-3 text-gray-500'>Subtotal:</dt>
                  <dd className='col-span-2 font-medium text-gray-800'>$2750.00</dd>
                </dl>

                <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                  <dt className='col-span-3 text-gray-500'>Total:</dt>
                  <dd className='col-span-2 font-medium text-gray-800'>$2750.00</dd>
                </dl>

                <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                  <dt className='col-span-3 text-gray-500'>Tax:</dt>
                  <dd className='col-span-2 font-medium text-gray-800'>$39.00</dd>
                </dl>

                <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                  <dt className='col-span-3 text-gray-500'>Amount paid:</dt>
                  <dd className='col-span-2 font-medium text-gray-800'>$2789.00</dd>
                </dl>

                <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                  <dt className='col-span-3 text-gray-500'>Due balance:</dt>
                  <dd className='col-span-2 font-medium text-gray-800'>$0.00</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <Notes />
      </Form>
    </div>
  )
}
