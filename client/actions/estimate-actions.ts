import { query } from '@/util/query'

export const GET = async () => await query.get('api/estimate').then((res) => res.data)

export const FIND = async (id: number) => await query.get(`api/estimate/${id}`).then((res) => res.data)

export const POST = (data: ArticleFormType) => query.post('api/estimate', { ...data })

export const PATCH = (id: string, data: EstimateFormType) => query.patch(`api/estimate/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`api/estimate/${id}`)
