import { query } from '@/util/query'
import { useRouter } from 'next/router'
import { Spin, Button, message } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { queryClient } from '@/util/react-query-client'
import { FIND, PATCH } from '@/actions/estimate-actions'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function Return({ session_id, data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter()
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    query
      .get(`http://localhost:7080/stripe/session-status`, {
        params: {
          session_id: session_id,
        },
      })
      .then((res) => {
        setStatus(res.data.status)
        setCustomerEmail(res.data.customer_email)
      })
  }, [])

  // mutations
  const { mutate } = useMutation({
    mutationFn: async (values: EstimateFormType) => PATCH(values.id.toString() as string, { ...values }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
    onSuccess: () => push(`/estimate/preview?ref=${data.id}`),
    onError: () => {
      message.error(`Something went wrong. Please try again.`)
    },
  })

  if (status === 'open') {
    return (
      <div className='fixed h-full w-full flex items-center justify-center'>
        <Spin />
      </div>
    )
  }

  if (status === 'complete') {
    return (
      <div className='fixed h-full w-full flex flex-col gap-2 items-center justify-center'>
        <p>We appreciate your business! A confirmation email will be sent to {customerEmail}.</p>
        <Button
          type='primary'
          onClick={() =>
            mutate({
              ...data,
              estimate_status: 'CONVERTED',
              invoice: {
                invoice_reference: `INV-${data.id}`,
                invoice_date: Date.now(),
                invoice_due_date: Date.now(),
                invoice_amount: data.estimate_total,
                invoice_amount_paid: data.estimate_total,
                invoice_amount_remaining: 0,
                invoice_payment_status: 'PAID',
              },
            })
          }>
          see your invoice
        </Button>
      </div>
    )
  }

  return null
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const {
    query: { session_id, est_id },
  } = context
  const data = await FIND(est_id! as string)
  return { props: { session_id, data } }
}) satisfies GetServerSideProps<{ session_id: string | string[] | undefined; data: EstimateType }>
