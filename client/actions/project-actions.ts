import { query } from '@/util/query'

export const GET = async () => await query.get('api/project').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`api/project/${id}`).then((res) => res.data)

export const POST = (customer: number, data: ProjectFormType) =>
  query.post(
    'api/project',
    { ...data },
    {
      params: {
        customer: customer,
      },
    }
  )

export const PATCH = (id: string, data: ProjectFormType) => query.patch(`api/project/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`api/project/${id}`)
