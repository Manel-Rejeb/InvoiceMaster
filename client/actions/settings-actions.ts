import { query } from '@/util/query'

export const POST = (data: OrgaConfig) => query.post('api/customer', { ...data })

export const PATCH = (id: string, data: OrgaConfig) => query.patch(`api/customer/${id}`, { ...data })
