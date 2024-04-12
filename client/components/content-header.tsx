'use client'

import type { FC, ReactElement } from 'react'

interface ComponentProps {
  title: string
  args?: ReactElement[]
}

export const ContentHeader: FC<ComponentProps> = ({ title, args }) => {
  return (
    <div className='flex items-center justify-between p-6'>
      <div>
        <p className='text-4xl capitalize font-semibold mb-3'>{title}</p>
      </div>
      {args && <div className='flex gap-2'>{...args}</div>}
    </div>
  )
}
