import { type JSX, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { AiOutlineMessage } from 'react-icons/ai'
import { Button, message, Col, DatePicker, Drawer, Form, Input, Row, Space, Radio } from 'antd/lib'
import { query } from '@/util/query'
import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH } from '@/actions/estimate-actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InvoiceTemplate } from '@/components/template/invoice-template'

const stripePromise = loadStripe('pk_test_51LKnmcIoW1Bc39s3uhg7WIjkhriyfhEWrkAqgildv3pteyMtgXfS2EP6ZzHwf1LGEAEWxS1GMl8JE5bTopdtGRSA00w6PIm8df')

export default function EstimatePreview({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { reload } = useRouter()

  // mutations
  const { mutate } = useMutation({
    mutationFn: async (values: EstimateFormType) => PATCH(values.id.toString() as string, { ...values }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
    onSuccess: () => reload(),
    onError: () => {
      message.error(`Something went wrong. Please try again.`)
    },
  })

  const [open, setOpen] = useState<boolean>(false)

  const fetchClientSecret = useCallback(() => {
    return query
      .post('http://localhost:7080/stripe/create-checkout-session', {
        ...data,
      })
      .then((res) => res.data.clientSecret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <div className='fixed top-0 left-0 w-full h-full z-10 bg-slate-100'>
      <div className='max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10'>
        <div className='sm:w-11/12 lg:w-3/4 mx-auto'>
          <InvoiceTemplate data={data} />

          <div className='mt-6 flex justify-end gap-x-3'>
            <Button
              type='dashed'
              onClick={() => {
                alert('this should render a pdf')
              }}
              icon={<AiOutlineMessage />}>
              Get as PDF
            </Button>
            {data.estimate_status !== 'REJECTED' ||
              (data.estimate_status === 'CONVERTED' && (
                <Button type='primary' danger onClick={() => mutate({ ...data, estimate_status: 'REJECTED' })}>
                  Reject
                </Button>
              ))}
            {data.estimate_status !== 'ACCEPTED' ||
              (data.estimate_status !== 'CONVERTED' && (
                <Button type='primary' onClick={() => mutate({ ...data, estimate_status: 'ACCEPTED' })}>
                  Accept
                </Button>
              ))}
            {data.estimate_status === 'ACCEPTED' ||
              (data.estimate_status !== 'CONVERTED' && (
                <Button type='primary' onClick={() => setOpen(true)}>
                  Pay
                </Button>
              ))}
          </div>
        </div>
      </div>
      <Drawer
        title='Pay your bill'
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Space>
        }>
        <Form layout='vertical' hideRequiredMark>
          <Col>
            <Form.Item name='name' label='Name' initialValue={1}>
              <Radio.Group defaultValue={1} style={{ width: '100%' }} buttonStyle='solid'>
                <Space direction='vertical' className='w-full'>
                  <Radio.Button value={1} style={{ width: '100%' }}>
                    <p>
                      One Time Payment :{' '}
                      <b>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: data.estimate_currency,
                        }).format(data.estimate_total)}
                      </b>
                    </p>
                  </Radio.Button>
                  <Radio.Button value={2} style={{ width: '100%' }} disabled>
                    <p>
                      Split 2 month payment :{' '}
                      <b>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: data.estimate_currency,
                        }).format(data.estimate_total / 2)}
                      </b>{' '}
                      per month
                    </p>
                  </Radio.Button>
                  <Radio.Button value={3} style={{ width: '100%' }} disabled>
                    <p>
                      Split 3 month payment :{' '}
                      <b>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: data.estimate_currency,
                        }).format(data.estimate_total / 2)}
                      </b>{' '}
                      per month
                    </p>
                  </Radio.Button>
                  <Radio.Button value={6} style={{ width: '100%' }} disabled>
                    <p>
                      Split 6 month payment :{' '}
                      <b>
                        {Intl.NumberFormat('fr-TN', {
                          style: 'currency',
                          currency: data.estimate_currency,
                        }).format(data.estimate_total / 2)}
                      </b>{' '}
                      per month
                    </p>
                  </Radio.Button>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Form>
        <div id='checkout'>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </Drawer>
    </div>
  )
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const { query } = context
  const data = await FIND(query.ref as string)
  return { props: { data } }
}) satisfies GetServerSideProps<{ data: EstimateType }>
