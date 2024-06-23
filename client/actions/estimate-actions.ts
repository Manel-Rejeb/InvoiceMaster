import { query } from '@/util/query'

export const GET = async () => await query.get('api/estimate').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`api/estimate/${id}`).then((res) => res.data)

export const POST = (data: EstimateFormType) =>
  query.post(
    'api/estimate',
    { ...data },
    {
      params: {
        customer: data.customer.id,
        project: data.project?.id,
      },
    }
  )

export const PATCH = (id: string, data: EstimateFormType) =>
  query.patch(
    `api/estimate/${id}`,
    { ...data },
    {
      params: {
        customer: data.customer.id,
        project: data.project?.id,
      },
    }
  )

export const DELETE = (id: number) => query.delete(`api/estimate/${id}`)
