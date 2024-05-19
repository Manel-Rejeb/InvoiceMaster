import { type FC, type ReactNode, useState, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { type MenuProps, Button, Layout, Menu, theme } from 'antd/lib'
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineSetting, AiOutlinePieChart, AiOutlineTeam, AiOutlineFileDone, AiOutlineCluster, AiOutlinePercentage, AiOutlineShopping, AiOutlineShop, AiOutlineProject } from 'react-icons/ai'

import { AccountAvatar } from '@/components/account-avatar'

interface ComponentProps {
  children: ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

const { Header, Sider, Content, Footer } = Layout

export const DashboardLayout: FC<ComponentProps> = ({ children }) => {
  const { push, pathname } = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menu_items: MenuItem[] = [
    {
      key: '1',
      icon: <AiOutlinePieChart size={21} />,
      label: 'Overview',
      onClick: () => push('/dashboard'),
    },
    {
      key: '2',
      icon: <AiOutlineTeam   size={21} /> ,
      label: 'Users',
      onClick: () => push('/dashboard/users'),
    },
    {
      key: '3',
      icon: <AiOutlineShop  size={21}/>,
      label: 'Customers',
      onClick: () => push('/dashboard/customers'),
    },
    {
      key: '4',
      icon: <AiOutlineShopping  size={21}/>,
      label: 'Articles',
      onClick: () => push('/dashboard/articles'),
    },
    {
      key: '5',
      icon: <AiOutlineFileDone  size={21}/>,
      label: 'Invoices',
      onClick: () => push('/dashboard/invoices'),
    },
    {
      key: '6',
      icon: <AiOutlineProject  size={21} />,
      label: 'Estimates',
      onClick: () => push('/dashboard/estimates'),
    },
    {
      key: '7',
      icon: <AiOutlinePercentage  size={21}/>,
      label: 'Taxes',
      onClick: () => push('/dashboard/taxes'),
    },
    {
      key: '8',
      icon: <AiOutlineCluster  size={21} />,
      label: 'Projects',
      onClick: () => push('/dashboard/projects'),
    },
    {
      key: '9',
      icon: <AiOutlineSetting  size={21}/>,
      label: 'Settings',
      onClick: () => push('/dashboard/settings'),
    },
  ]

  /* handles selected menu item index */
  const [selectedeMenuItem, setSelectedMenuItem] = useState('1')
  useEffect(() => {
    const currentPath = paths.find((path) => path.path.includes(pathname))
    if (currentPath) {
      setSelectedMenuItem(currentPath.key)
    }
  }, [pathname])

  return (
    <Layout>
      <Sider width={275} trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0 }}>
        <div className='h-16 mb-6 flex items-center justify-center'>
          <Image src='/logo/visto.png' height={48} width={collapsed ? 42 : 82} alt='visto logo image' />
        </div>
        <Menu theme='dark' mode='inline' selectedKeys={[selectedeMenuItem]} items={menu_items} />
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
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='border shadow-sm h-full overflow-hidden'>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Visto Consulting ©{new Date().getFullYear()} Created by Manel Rejeb.</Footer>
      </Layout>
    </Layout>
  )
}

const paths: { key: string; path: string }[] = [
  { key: '1', path: '/dashboard' }, // Overview
  { key: '2', path: '/dashboard/users' }, // Users
  { key: '3', path: '/dashboard/customers' }, // Customers
  { key: '4', path: '/dashboard/articles' }, // Articles
  { key: '5', path: '/dashboard/invoices' }, // Invoices
  { key: '6', path: '/dashboard/estimates' }, // Estimates
  { key: '7', path: '/dashboard/taxes' }, // Taxes
  { key: '8', path: '/dashboard/projects' }, // Projects
  { key: '9', path: '/dashboard/settings' }, // Settings
]
