'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { File } from '@/components/file'
import { SelectDropDown } from '@/components/select'

import { UNITS } from '@/constants/article-unit'
import { TAX_VALUES } from '@/constants/tax-value'
import { CURRENCIES } from '@/constants/currency-values'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { articleFormValidation } from '@/app/dashboard/article/_actions/form-article-validation'
import { FIND, POST, PATCH } from '@/app/dashboard/article/_actions/server-action'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  type ArticleForm = yup.InferType<typeof articleFormValidation>

  const { push } = useRouter()
  const [loading, setLoading] = useState(true)

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(articleFormValidation),
  })

  useEffect(() => {
    if (params.id !== 'new') {
      FIND(params.id)
        .then((res) =>
          reset({
            ...res,
            article_type: res.article_type ? 'true' : 'false',
            article_tax: `${res.article_tax}%`,
            article_picture: '',
          } as unknown as ArticleForm)
        )
        .then(() => setLoading(false))
    }
  }, [params.id])

  if (loading && params.id != 'new') return <div>Loading...</div>

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Articles</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of articles that you provide as services.</p>
        </div>

        <Button variant='destructive' onClick={() => push('/dashboard/article')}>
          Cancel
        </Button>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6'>
          <div className='flex flex-col gap-4 mb-6'>
            <div className='flex gap-4'>
              <div className='flex-1 flex flex-col gap-4'>
                <Controller
                  name='article_name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      label='Article Name'
                      errorMessage={errors?.article_name && errors.article_name.message}
                    />
                  )}
                />

                <Controller
                  name='article_type'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label='Article type'
                      data={[
                        { label: 'Product', value: 'false' },
                        { label: 'Service', value: 'true' },
                      ]}
                      required
                      errorMessage={errors?.article_type && errors.article_type.message}
                    />
                  )}
                />

                <Controller
                  name='article_unit'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label='Article Unit'
                      data={UNITS}
                      required
                      errorMessage={errors?.article_unit && errors.article_unit.message}
                    />
                  )}
                />
              </div>

              <div className='flex-1'>
                <Controller
                  name='article_picture'
                  control={control}
                  render={({ field }) => (
                    <File
                      {...field}
                      label='Article Picture'
                      errorMessage={errors?.article_picture && errors.article_picture.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <div className='flex col-span-2'>
                <Controller
                  name='article_price'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      required
                      type='number'
                      label='Article Price'
                      errorMessage={errors?.article_price && errors.article_price.message}
                    />
                  )}
                />
              </div>
              <div className='flex col-span-1'>
                <Controller
                  name='article_currency'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label='Base Currency'
                      data={CURRENCIES.map((el, index) => ({ ...el, label: `${el.value} - ${el.label}`, key: index }))}
                      required
                      errorMessage={errors?.article_currency && errors.article_currency.message}
                    />
                  )}
                />
              </div>
              <div className='flex col-span-1'>
                <Controller
                  name='article_tax'
                  control={control}
                  render={({ field }) => (
                    <SelectDropDown
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label='Article Tax'
                      data={TAX_VALUES.map((el) => ({ ...el, label: `${el.value} - ${el.label}` }))}
                      required
                      errorMessage={errors?.article_tax && errors.article_tax.message}
                    />
                  )}
                />
              </div>
            </div>
            <Controller
              name='article_description'
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label='Article Description'
                  rows={6}
                  errorMessage={errors?.article_description && errors.article_description.message}
                />
              )}
            />
          </div>
          <div className='w-full flex items-center gap-4 justify-end'>
            {params.id === 'new' ? (
              <Button
                type='submit'
                onClick={handleSubmit((data: ArticleForm) => {
                  POST(data).then((res) => push('/dashboard/article'))
                })}>
                Create New
              </Button>
            ) : (
              <Button
                type='submit'
                onClick={handleSubmit((data) => {
                  PATCH(params.id, data).then((res) => push('/dashboard/article'))
                })}>
                Update Article
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

/**
 *  <Button
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  //PATCH(params.id, data).then((res) => push('/dashboard/article'))
                  console.log(getValues('article_name'))
                  console.log(getValues('article_type'))
                  console.log(getValues('article_unit'))
                  console.log(getValues('article_picture'))
                  console.log(getValues('article_price'))
                  console.log(getValues('article_currency'))
                  console.log(getValues('article_tax'))
                  console.log(getValues('article_description'))
                }}>
                Update Article
              </Button>
 */
