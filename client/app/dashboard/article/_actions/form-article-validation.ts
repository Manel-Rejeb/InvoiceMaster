'use client'

import * as yup from 'yup'

export const articleFormValidation = yup.object().shape({
  id: yup.string(),
  article_name: yup.string().required('Article name is required'),
  article_description: yup.string(),
  article_type: yup.string(),
  article_price: yup.number(),
  article_currency: yup.string(),
  article_tax: yup.string(),
  article_unit: yup.string(),
  article_picture: yup.string(),
  isSoftDelete: yup.boolean(),
})
