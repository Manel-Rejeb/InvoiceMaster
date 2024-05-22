import { query } from '@/util/query'

export const GET = async () => await query.get('/api/tax').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`/api/tax/${id}`).then((res) => res.data)

export const POST = (data: TaxFormType) => query.post('/api/tax', { ...data })

export const PATCH = (id: string, data: TaxFormType) => query.patch(`/api/tax/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`/api/tax/${id}`)
