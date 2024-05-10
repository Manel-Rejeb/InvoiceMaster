'use client'

import * as yup from 'yup'
import { projectFormValidation } from '@/app/dashboard/projects/_actions/form-article-validation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { FIND } from '@/app/dashboard/projects/_actions/server-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropDown } from '@/components/select'
import { PROJECT_STATUS } from '@/constants/project-status'
import { PATCH, POST } from '@/app/dashboard/projects/_actions/server-action'
import { CalendarForm } from '@/components/ui/calendar-button'

interface PageProps {
  params: { id: string }
}

export default function page({ params }: PageProps) {
  type ProjectForm = yup.InferType<typeof projectFormValidation>

  const { push } = useRouter()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(projectFormValidation),
  })
  useEffect(() => {
    if (params.id !== 'new') {
      FIND(params.id)
        .then((res) =>
          reset({
            ...res,
            project_status: res.project_status ? 'true' : 'false',
            project_start_date: `${res.project_start_date}%`,
            project_end_date: `${res.project_end_date}%`,
          } as unknown as ProjectForm)
        )
        .then(() => setLoading(false))
    }
  }, [params.id])
  if (loading && params.id != 'new') return <div>Loading...</div>
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Projects</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of projects that you're working on.</p>
        </div>
        <Button variant='destructive' onClick={() => push('/dashboard/projects')}>
          Cancel
        </Button>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        <form className='w-full h-full p-6'>
          <div className='flex flex-col gap-4 mb-5'>
            <div className='flex col-span-2 gap-8 '>
              <Controller
                control={control}
                name='project_name'
                render={({ field }) => (
                  <Input
                    {...field}
                    required
                    label='Project Name'
                    errorMessage={errors?.project_name && errors.project_name.message}
                  />
                )}
              />

              <Controller
                control={control}
                name='project_status'
                render={({ field }) => (
                  <SelectDropDown
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    label='Project Status'
                    data={PROJECT_STATUS}
                    required
                    errorMessage={errors?.project_status && errors.project_status.message}
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name='project_description'
              render={({ field }) => (
                <Textarea
                  {...field}
                  required
                  label='Description'
                  errorMessage={errors?.project_description && errors.project_description.message}
                />
              )}
            />
            <div className='flex  gap-4'>
              <Controller
                control={control}
                name='project_start_date'
                render={({ field }) => (
                  <CalendarForm
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md border'
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name='project_end_date'
                render={({ field }) => (
                  <CalendarForm
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md border'
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className='w-full flex items-center gap-4 justify-end'>
            {params.id === 'new' ? (
              <Button
                type='submit'
                onClick={handleSubmit((data: ProjectForm) => {
                  POST(data).then((res) => push('/dashboard/projects'))
                })}>
                Create New
              </Button>
            ) : (
              <Button
                type='submit'
                onClick={handleSubmit((data) => {
                  PATCH(params.id, data).then((res) => push('/dashboard/projects'))
                })}>
                Update project
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
