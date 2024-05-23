import { useRouter } from 'next/router'
import {type JSX, useEffect} from 'react'
import { Form} from 'antd/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FIND, PATCH, POST } from '@/actions/customer-actions'
import { queryClient } from '@/util/react-query-client'
import { Spin } from 'antd/lib'



export default function Customer(): JSX.Element {
    const {
        query: { id },
        push,
    } = useRouter()
  const [form] = Form.useForm()

  const { mutate } = useMutation({
    mutationFn: async (values: CustomerType) => {
      if (id === 'create') {
        return POST(values)
      } else {
        return PATCH(id as string, values)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
    onSuccess: () => push('/dashboard/customers'),
    onError: () => {
      alert('Not saved')
    },
  })

  const { data: customer, isLoading } = useQuery({
    queryKey:['customer', id],
    queryFn: async () => {
      if (id !== 'create') {
        return FIND(`${id}`)
      }
    },
    enabled: id !== 'create',
    refetchOnMount: true,
  })

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer)
    }
  }, [customer, form])

if (id !== 'create' && isLoading) {
    return <Spin />
}
    return (
        <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-full p-6 flex items-center justify-end'>
        
        </div>
      </div>
    )
}