import { type JSX } from 'react'

import { Spin } from 'antd/lib'
import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/article-actions'
import { DataTable } from '@/components/data-table'
import { articleColumns } from '@/components/table-headers/article-tableheader'

export default function Articles() : JSX.Element {
    const {data: articles, isLoading} = useQuery({
        queryKey: ['articles'],
        queryFn: GET,
        staleTime: 0
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spin />
            </div>
        )
    }
   
    return (
        <div className='w-full flex items-center justify-center'>
        <DataTable<ArticleType> data={articles} columns={articleColumns} />
      </div>
    )
}