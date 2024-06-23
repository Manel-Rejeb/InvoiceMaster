import { query } from '@/util/query'

export const POST = (data: OrgaConfig) => query.post('api/setting', { ...data })

export const PATCH = (id: string, data: OrgaConfig) => query.patch(`api/setting/${id}`, { ...data })

export const FIND = async () => await query.get(`/api/setting`).then((res) => res.data)
