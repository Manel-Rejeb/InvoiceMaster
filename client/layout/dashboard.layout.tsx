import { type FC, type ReactNode, useState } from 'react'
import Image from 'next/image'

import { type MenuProps, Button, Layout, Menu, theme } from 'antd/lib'
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineSetting, AiOutlinePieChart, AiOutlineTeam, AiOutlineFileDone, AiOutlineCluster, AiOutlinePercentage, AiOutlineShopping, AiOutlineShop, AiOutlineProject } from 'react-icons/ai'

import { AccountAvatar } from '@/components/account-avatar'

interface ComponentProps {
  children: ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

const { Header, Sider, Content, Footer } = Layout

export const DashboardLayout: FC<ComponentProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menu_items: MenuItem[] = [
    {
      key: '1',
      icon: <AiOutlinePieChart />,
      label: 'Overview',
    },
    {
      key: '2',
      icon: <AiOutlineTeam />,
      label: 'Users',
    },
    {
      key: '3',
      icon: <AiOutlineShop />,
      label: 'Customers',
    },
    {
      key: '4',
      icon: <AiOutlineShopping />,
      label: 'Articles',
    },
    {
      key: '5',
      icon: <AiOutlineFileDone />,
      label: 'Invoices',
    },
    {
      key: '6',
      icon: <AiOutlineProject />,
      label: 'Estimates',
    },
    {
      key: '7',
      icon: <AiOutlinePercentage />,
      label: 'Taxes',
    },
    {
      key: '8',
      icon: <AiOutlineCluster />,
      label: 'Projects',
    },
    {
      key: '9',
      icon: <AiOutlineSetting />,
      label: 'Settings',
    },
  ]

  return (
    <Layout>
      <Sider width={350} trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0 }}>
        <div className='h-16 mb-6 flex items-center justify-center'>
          <Image src='/logo/visto.png' height={48} width={collapsed ? 42 : 82} alt='visto logo image' />
        </div>
        <Menu theme='dark' mode='inline' selectedKeys={['1']} items={menu_items} />
      </Sider>
      <Layout>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', padding: 0, background: colorBgContainer }} className='flex items-center justify-between border-b shadow-sm'>
          <Button
            type='text'
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <AiOutlineMenuUnfold size={21} /> : <AiOutlineMenuFold size={21} />}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <AccountAvatar />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='border shadow-sm'>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Visto Consulting ©{new Date().getFullYear()} Created by Manel Rejeb.</Footer>
      </Layout>
    </Layout>
  )
}
