'use client'

import type { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Step } from './step'

type ComponentProps = {}

export const Stepper: FC<Partial<ComponentProps>> = ({}) => {
  const { push } = useRouter()

  const step = useSearchParams().get('step')

  return (
    <div className='w-full flex flex-col p-16'>
      {step_org_navigation.map((item, index: number) => (
        <div key={index}>
          <Step
            index={index + 1}
            isActive={(step ? parseInt(step) : 1) >= index + 1}
            title={item.title}
            subTitle={item.subTitle}
            onChangeStep={() => push(`/organization-config?step=${index + 1}`)}
          />
          {step_org_navigation.length !== index + 1 && (
            <div className='w-[1px] border-l-[1.75px] border-dashed border-blue-600 h-[42px] ml-[27px]' />
          )}
        </div>
      ))}
    </div>
  )
}

const step_org_navigation: { title: string; subTitle: string }[] = [
  { title: 'organization details', subTitle: 'add the required informations.' },
  { title: 'taxes & currencies', subTitle: 'configure tax values and currencies' },
  { title: 'payment options', subTitle: 'configure your payement methods' },
]
