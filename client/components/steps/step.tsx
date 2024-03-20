'use client'

import type { FC } from 'react'
import { mr } from '@/lib/mr'

type ComponentProps = {
  index: number
  title: string
  subTitle: string
  isActive?: boolean
  onChangeStep: () => void
}

export const Step: FC<ComponentProps> = ({ index = 1, title, subTitle, isActive = false, onChangeStep }) => {
  return (
    <button type='button' onClick={onChangeStep} className='w-full flex-1 flex items-center gap-2'>
      <div
        className={mr(
          'w-[58px] h-[58px] flex items-center justify-center border-[1.75px] border-blue-600 rounded-lg',
          isActive ? 'bg-blue-600 border-blue-800 text-white text-lg' : 'bg-white border-dashed'
        )}>
        <p className='flex'>{index}</p>
      </div>
      <div className='flex-1 flex flex-col items-start px-2'>
        <p className='text-base capitalize text-start'>{title}</p>
        <p className='text-sm first-letter:capitalize text-start text-gray-600'>{subTitle}</p>
      </div>
    </button>
  )
}
