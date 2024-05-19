'use client'

import * as yup from 'yup'

export const expenseFormValidation = yup.object().shape({
  id: yup.string(),
  expense_name: yup.string().required('Expense name is required'),
  expense_description: yup.string(),
  expense_buy_price: yup.number(),
  expense_sell_price: yup.number(),
  expense_currency: yup.string(),
  expense_tax: yup.string(),
  expense_unit: yup.string(),
  expense_picture: yup.string(),
  isSoftDelete: yup.boolean(),
})
