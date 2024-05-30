import { query } from '@/util/query'

export const GET = async () => await query.get('api/user').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`api/user/${id}`).then((res) => res.data)

export const POST = (data: UserFormType) => query.post('api/user', { ...data })

export const PATCH = (id: string, data: UserFormType) => query.patch(`api/user/${id}`, { ...data })

export const DELETE = (id: number) => query.delete(`api/user/${id}`)
