'use client'

import * as yup from 'yup'

export const projectFormValidation = yup.object().shape({
  id: yup.string(),
  project_name: yup.string().required('Project name is required'),
  project_description: yup.string(),
  project_start_date: yup.date().required('Start date is required'),
  project_end_date: yup.date().required('End date is required'),
  project_status: yup.string().required('Status is required'),
  isSoftDelete: yup.boolean(),
})
