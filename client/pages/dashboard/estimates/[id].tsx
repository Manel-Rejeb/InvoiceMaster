import { type JSX, type ChangeEvent, useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import dayjs from 'dayjs'

import { app } from '@/constants/APP'
import { CURRENCY } from '@/constants/CURRENCY'

import { ItemsTable } from '@/components/table-headers/item-tableheader'
import { NoteTableHeader } from '@/components/table-headers/note-tableheader'

import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH, POST } from '@/actions/estimate-actions'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Form, Select, DatePicker, Button, Space, message, Input, Spin, InputNumber } from 'antd/lib'
import { AiOutlineFileDone } from 'react-icons/ai'

import { disptachCustomer } from '@/providers/customer-provider'
import { disptachProject } from '@/providers/project-provider'
import { disptachTax } from '@/providers/tax-provider'

export default function Estimate(): JSX.Element {
  const [notes, setNotes] = useState<{ note: string }[]>([])
  const [items, setItems] = useState<ItemEstimateType[]>([])

  const { data: customer } = disptachCustomer()
  const { data: project } = disptachProject()
  const { data: tax } = disptachTax()

  const customerOptions = useMemo(() => customer?.map((el) => ({ label: el.customer_email, value: el.id })) || [], [customer])
  const projectOptions = useMemo(() => project?.map((el) => ({ label: el.project_name, value: el.id })) || [], [project])
  const taxOptions = useMemo(() => tax?.map((el) => ({ label: `${el.tax_name.toLocaleUpperCase()} - ${el.tax_percentage}%`, value: `${el.tax_percentage}` })) || [], [tax])

  const { query, push } = useRouter()

  const [form] = Form.useForm<EstimateFormType>()

  // mutations
  const { mutate } = useMutation({
    mutationFn: async (values: EstimateFormType) => {
      const articles = items
      const estimateNotes = form.getFieldValue('estimate_notes')

      const totalHT = articles.reduce((total: number, item: ItemEstimateType) => {
        return total + (item.item_price! + (item.item_price! * item.item_tax) / 100)! * item.item_quantity
      }, 0)

      const discountAmount = (totalHT * form.getFieldValue('estimate_discount')) / 100
      const subtotal = totalHT - discountAmount
      const taxAmount = (subtotal * form.getFieldValue('estimate_tax')) / 100
      const total = subtotal + taxAmount

      const payload = {
        ...values,
        items: form.getFieldValue('items'),
        estimate_notes: JSON.stringify(estimateNotes),
        estimate_total: total,
      }

      if (query.id === 'create') {
        return POST(payload)
      } else {
        return PATCH(query.id as string, payload)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
    onSuccess: () => push('/dashboard/estimates'),
    onError: () => {
      message.error(`Could not ${query.id === 'create' ? 'save' : 'update'} the estimate. Please try again.`)
    },
  })

  const filterOption = (input: string, option?: { label: string; value: string | number }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const { data, isLoading } = useQuery({
    queryKey: ['estimate', query.id],
    queryFn: () => FIND(query.id as string),
    enabled: query.id !== 'create',
    refetchOnMount: true,
  })

  useEffect(() => {
    if (data) {
      setItems(data.items)
      setNotes(JSON.parse(data.estimate_notes))

      form.setFieldsValue({
        ...data,
        estimate_date: dayjs(data.estimate_date),
        estimate_expiary_date: dayjs(data.estimate_expiary_date),
        items: data.items,
        estimate_notes: JSON.parse(data.estimate_notes),
      })
    }
  }, [data, query.id])

  if (query.id !== 'create' && isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8 my-4'>
      <Form form={form} labelCol={{ span: 8 }} labelAlign='left' onFinish={(values: EstimateFormType) => mutate({ ...values })} className='w-full'>
        <div className='mb-5 pb-5 flex justify-between items-center border-b border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-800'>Estimate</h2>
          <div className='flex flex-1 items-center justify-end gap-4'>
            <Form.Item label='Date' name='estimate_date' noStyle initialValue={dayjs()}>
              <DatePicker placeholder='date' />
            </Form.Item>
            <Form.Item label='Due Date' name='estimate_expiary_date' noStyle>
              <DatePicker placeholder='Due date' />
            </Form.Item>
            <Form.Item className='mb-0'>
              <Button type='primary' htmlType='submit'>
                <div className='flex items-center gap-2'>
                  <AiOutlineFileDone />
                  {query.id === 'create' ? <p>Create</p> : <p>Update</p>}
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
            <Form.Item name={['customer', 'id']}>
              <Select allowClear showSearch placeholder='Select a customer to bill' className='h-fit min-h-fit w-full' options={customerOptions} filterOption={filterOption} />
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['project', 'id']}>
              <Select allowClear showSearch placeholder='Select a project' className='h-fit min-h-fit w-full' options={projectOptions} filterOption={filterOption} />
            </Form.Item>
          </div>

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
              <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>Tax ID Number:</div>
              <div className='font-medium text-gray-800 dark:text-neutral-200'>
                <div className='not-italic font-normal'>{app.detail.TIN}</div>
              </div>
            </div>

            <Form.Item noStyle shouldUpdate>
              {() => {
                return (
                  <div className='flex gap-x-3 mt-6 text-sm'>
                    <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>{form.getFieldValue(['customer', 'id']) && 'Billing details:'}</div>
                    <div className='font-medium text-gray-800 dark:text-neutral-200'>
                      <span className='block font-semibold'>
                        {customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_contact_name}{' '}
                        {customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_contact_last_name}
                      </span>
                      <div className='not-italic font-normal'>{customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_address}</div>
                      {form.getFieldValue(['customer', 'id']) && (
                        <div className='not-italic font-normal'>
                          {customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_zip} -{' '}
                          {customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_city} -{' '}
                          {customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_country}
                        </div>
                      )}
                      <div className='not-italic font-normal'>{customer.find((el) => el.id === form.getFieldValue(['customer', 'id']))?.customer_phone}</div>
                    </div>
                  </div>
                )
              }}
            </Form.Item>

            <Form.Item noStyle shouldUpdate>
              {() => {
                return (
                  <div className='flex gap-x-3 mt-6 text-sm'>
                    <div className='min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500'>{form.getFieldValue(['project', 'id']) && 'Project details:'}</div>
                    <div className='font-medium text-gray-800 dark:text-neutral-200'>
                      <span className='block font-semibold'>{project.find((el) => el.id === form.getFieldValue(['project', 'id']))?.project_name}</span>
                      <div className='not-italic font-normal'>{project.find((el) => el.id === form.getFieldValue(['project', 'id']))?.project_status}</div>
                    </div>
                  </div>
                )
              }}
            </Form.Item>
          </div>

          <div className='flex flex-col gap-2  justify-items-end'>
            <Form.Item label='Invoice Currency' name='estimate_currency' className='m-0' initialValue={'TND'}>
              <Select showSearch allowClear placeholder='USD' filterOption={filterOption} options={CURRENCY.map((el) => ({ label: el.value, value: el.value }))} />
            </Form.Item>
            {query.id !== 'create' && (
              <Form.Item label='Invoice Status' name='estimate_status' className='m-0'>
                <Select
                  placeholder='Select a status'
                  options={[
                    { label: 'Draft', value: 'DRAFT' },
                    { label: 'Accepted', value: 'ACCEPTED' },
                    { label: 'Rejected', value: 'REJECTED' },
                    { label: 'Expired', value: 'EXPIRED' },
                    { label: 'Converted', value: 'CONVERTED' },
                  ]}
                />
              </Form.Item>
            )}

            <Form.Item label='Estimate discount' name='estimate_discount' className='m-0' initialValue={0}>
              <InputNumber placeholder='0.00' min={0} className='w-full' addonAfter={'%'} />
            </Form.Item>
            <Form.Item label='Estimate tax' name='estimate_tax' className='m-0' initialValue={0}>
              <Select allowClear showSearch filterOption={filterOption} placeholder='Select a tax' className='h-fit min-h-fit w-full' options={taxOptions} />
            </Form.Item>
          </div>
        </div>
        <div className='mt-6 border border-gray-200 rounded-lg space-y-4'>
          <ItemsTable form={form} items={items} setItems={setItems} />
        </div>

        <div className='flex justify-end mt-10'>
          <div className='max-w-2xl sm:text-end space-y-2'>
            <div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
              <Form.Item noStyle shouldUpdate>
                {() => {
                  return (
                    <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                      <dt className='col-span-3 text-gray-500'>Total HT:</dt>
                      <dd className='col-span-2 font-medium text-gray-800'>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: form.getFieldValue('estimate_currency') ?? 'TND',
                        }).format(
                          items.reduce((total: number, item: ItemEstimateType) => {
                            return total + (item.item_price! + (item.item_price! * item.item_tax) / 100)! * item.item_quantity
                          }, 0)
                        )}
                      </dd>
                    </dl>
                  )
                }}
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {() => {
                  return (
                    <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                      <dt className='col-span-3 text-gray-500'>Discount:</dt>
                      <dd className='col-span-2 font-medium text-gray-800'>
                        -
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: form.getFieldValue('estimate_currency') ?? 'TND',
                        }).format(
                          (items.reduce((total: number, item: ItemEstimateType) => {
                            return total + (item.item_price! + (item.item_price! * item.item_tax) / 100)! * item.item_quantity
                          }, 0) *
                            form.getFieldValue('estimate_discount')) /
                            100
                        )}
                      </dd>
                    </dl>
                  )
                }}
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {() => {
                  const totalHT = items.reduce((total: number, item: ItemEstimateType) => {
                    return total + (item.item_price! + (item.item_price! * item.item_tax) / 100)! * item.item_quantity
                  }, 0)

                  const discountAmount = (totalHT * form.getFieldValue('estimate_discount')) / 100
                  const subtotal = totalHT - discountAmount
                  const taxAmount = (subtotal * form.getFieldValue('estimate_tax')) / 100

                  return (
                    <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                      <dt className='col-span-3 text-gray-500'>Tax:</dt>
                      <dd className='col-span-2 font-medium text-gray-800'>
                        +
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: form.getFieldValue('estimate_currency') ?? 'TND',
                        }).format(taxAmount)}
                      </dd>
                    </dl>
                  )
                }}
              </Form.Item>

              <Form.Item noStyle shouldUpdate>
                {() => {
                  const totalHT = items.reduce((total: number, item: ItemEstimateType) => {
                    return total + (item.item_price! + (item.item_price! * item.item_tax) / 100)! * item.item_quantity
                  }, 0)

                  const discountAmount = (totalHT * form.getFieldValue('estimate_discount')) / 100
                  const subtotal = totalHT - discountAmount
                  const taxAmount = (subtotal * form.getFieldValue('estimate_tax')) / 100
                  const total = subtotal + taxAmount

                  return (
                    <dl className='grid sm:grid-cols-5 gap-x-3 text-sm'>
                      <dt className='col-span-3 text-gray-500'>Total:</dt>
                      <dd className='col-span-2 font-medium text-gray-800'>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: form.getFieldValue('estimate_currency') ?? 'TND',
                        }).format(total)}
                      </dd>
                    </dl>
                  )
                }}
              </Form.Item>
            </div>
          </div>
        </div>
        <div className='mt-6 border border-gray-200 rounded-lg space-y-4'>
          <NoteTableHeader form={form} notes={notes} setNotes={setNotes} />
        </div>
      </Form>
    </div>
  )
}
