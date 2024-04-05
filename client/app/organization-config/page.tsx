'use client'

import type { FC } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { orgaConfigValidation } from '@/validation/orga-config-validation'

import { OrgaConfig } from '@/components/steps/form/orga-config'

import { PaymentOptions } from '@/components/steps/form/payment-options'
import { TaxConfig } from '@/components/steps/form/tax-currency'

type ComponentProps = {
  searchParams: { step: string | undefined }
}

const Page: FC<ComponentProps> = ({ searchParams }) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(orgaConfigValidation),
  })

  function insertStep(step: string | undefined) {
    switch (step) {
      case '1':
        return <OrgaConfig />
        break
      case '2':
        return <TaxConfig />
        break
      case '3':
        return <PaymentOptions />
        break
      default:
        return <OrgaConfig />
        break
    }
  }

  return <FormProvider {...methods}>{insertStep(searchParams.step)}</FormProvider>
}

export default Page
