import { query } from '@/util/query'

export const GET = async () => await query.get('api/project').then((res) => res.data)

export const FIND = async (id: number) => await query.get(`api/project/${id}`).then((res) => res.data)

export const POST = () => {}

export const PATCH = () => {}

export const DELETE = (id: number) => query.delete(`api/project/${id}`)
