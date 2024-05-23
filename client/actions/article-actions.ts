import { query } from '@/util/query'

export const GET = async () => await query.get('api/article').then((res) => res.data)

export const FIND = async (id: number) => await query.get(`api/article/${id}`).then((res) => res.data)

export const POST = (data: ArticleType) => query.post('api/article', { ...data })

export const PATCH = (id: string, data: ArticleType) => query.patch(`api/article/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`api/article/${id}`)
