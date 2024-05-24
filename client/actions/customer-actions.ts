import { query } from '@/util/query'

export const GET = async () => await query.get('api/customer').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`api/customer/${id}`).then((res) => res.data)

export const POST = (data: CustomerFormType) => query.post('api/customer', { ...data })

export const PATCH = (id: string, data: CustomerFormType) => query.patch(`api/customer/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`api/customer/${id}`)
