import { type JSX } from 'react'
import Head from 'next/head'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

import { disptachArticle } from '@/providers/article-provider'
import { disptachEstimate } from '@/providers/estimate-provider'
import { Card, Col, Row, Statistic } from 'antd/lib'
import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineProject, AiOutlineTeam } from 'react-icons/ai'
import { disptachProject } from '@/providers/project-provider'
import { disptachCustomer } from '@/providers/customer-provider'

export default function Dashboard(): JSX.Element {
  const { data: article } = disptachArticle()
  const { data: estimate } = disptachEstimate()
  const { data: project } = disptachProject()
  const { data: customer } = disptachCustomer()

  return (
    <div className='bg-white h-full w-full flex flex-col items-center mx-auto gap-6 overflow-hidden '>
      <Head>
        <title>Overview</title>
      </Head>

      {/* les cards */}

      <div className='w-full flex items-center gap-4'>
        <Card style={{ width: 300, backgroundColor: '#F5F7F8' }} bordered={false}>
          <Statistic title='Paid amount' suffix={<span>TDN</span>} value={30000} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<AiOutlineCheckCircle />} />
        </Card>

        <Card style={{ width: 300, backgroundColor: '#F5F7F8' }} bordered={false}>
          <Statistic title='Unpaid amount' suffix={<span>TDN</span>} value={12000} precision={2} valueStyle={{ color: '#cf1322' }} prefix={<AiOutlineClose />} />
        </Card>

        <Card style={{ width: 300, backgroundColor: '#F5F7F8' }} bordered={false}>
          <Statistic title='Project number' value={project.length} precision={0} valueStyle={{ color: '#31363F' }} prefix={<AiOutlineProject />} />
        </Card>

        <Card style={{ width: 300, backgroundColor: '#F5F7F8' }} bordered={false}>
          <Statistic title='Client Number' value={customer.length} precision={0} valueStyle={{ color: '#3572EF' }} prefix={<AiOutlineTeam />} />
        </Card>
      </div>
      {/* les chartes dounts */}

      <div className='w-full flex items-center justify-between'>
        <Col span={100}>
          <Card style={{ backgroundColor: '#F5F7F8' }} title=' Articles' bordered={false}>
            <div style={{ width: 300, height: 300 }}>
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
                      backgroundColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </Col>

        <Col span={100}>
          <Card style={{ backgroundColor: '#F5F7F8' }} title='Invoices' bordered={false}>
            <div style={{ width: 300, height: 300 }}>
              <Doughnut
                data={{
                  labels: ['Paid', 'Unpaid', 'partially paid'],
                  datasets: [
                    {
                      data: [
                        estimate.filter((el) => el.estimate_status === 'ACCEPTED').length,
                        estimate.filter((el) => el.estimate_status === 'REJECTED').length,
                        estimate.filter((el) => el.estimate_status === 'DRAFT').length,
                        estimate.filter((el) => el.estimate_status === 'SENT').length,
                      ],
                      backgroundColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </Col>

        <Col span={100}>
          <Card style={{ backgroundColor: '#F5F7F8' }} title='Estimates' bordered={false}>
            <div style={{ width: 300, height: 300 }}>
              <Doughnut
                data={{
                  labels: ['Accepted', 'Rejected', 'draft'],
                  datasets: [
                    {
                      data: [
                        estimate.filter((el) => el.estimate_status === 'ACCEPTED').length,
                        estimate.filter((el) => el.estimate_status === 'REJECTED').length,
                        estimate.filter((el) => el.estimate_status === 'DRAFT').length,
                        estimate.filter((el) => el.estimate_status === 'SENT').length,
                      ],
                      backgroundColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderColor: ['rgb(151, 49, 49)', 'rgb(24, 90, 219)', 'rgb(65, 176, 110)'],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </Col>
      </div>
    </div>
  )
}
