import { type JSX } from 'react'
import Head from 'next/head'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

import { disptachCustomer } from '@/providers/customer-provider'
import { disptachProject } from '@/providers/project-provider'
import { disptachTax } from '@/providers/tax-provider'
import { disptachArticle } from '@/providers/article-provider'

export default function Dashboard(): JSX.Element {
  const { data: article } = disptachArticle()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center mx-auto gap-6 overflow-hidden'>
      <Head>
        <title>Overview</title>
      </Head>
      <h1>dashboard page</h1>

      <div style={{ width: 500, height: 500 }}>
        <Doughnut
          data={{
            labels: ['Product', 'Expense', 'Service'],
            datasets: [
              {
                data: [
                  article.filter((el) => el.article_type === 'PRODUCT').length,
                  article.filter((el) => el.article_type === 'EXPENSE').length,
                  article.filter((el) => el.article_type === 'SERVICE').length,
                ],
                backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
