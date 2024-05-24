import { type FC, type ReactNode, useState, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { type MenuProps, Button, Layout, Menu, theme } from 'antd/lib'
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineSetting,
  AiOutlinePieChart,
  AiOutlineTeam,
  AiOutlineFileDone,
  AiOutlineCluster,
  AiOutlinePercentage,
  AiOutlineShopping,
  AiOutlineShop,
  AiOutlineProject,
  AiOutlinePoundCircle,
} from 'react-icons/ai'

import { AccountAvatar } from '@/components/account-avatar'
import { BreadCrumbs } from '@/components/breadcrumb'

interface ComponentProps {
  children: ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

const { Header, Sider, Content, Footer } = Layout

export const DashboardLayout: FC<ComponentProps> = ({ children }) => {
  const { push, pathname } = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
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
      icon: <AiOutlineTeam size={21} />,
      label: 'Users',
      onClick: () => push('/dashboard/users'),
    },
    {
      key: '3',
      icon: <AiOutlineShop size={21} />,
      label: 'Customers',
      onClick: () => push('/dashboard/customers'),
    },
    {
      key: '4',
      icon: <AiOutlineShopping size={21} />,
      label: 'Articles',
      onClick: () => push('/dashboard/articles'),
    },
    {
      key: '5',
      icon: <AiOutlinePoundCircle size={21} />,
      label: 'Expenses',
      onClick: () => push('/dashboard/expenses'),
    },
    {
      key: '6',
      icon: <AiOutlineFileDone size={21} />,
      label: 'Invoices',
      onClick: () => push('/dashboard/invoices'),
    },
    {
      key: '7',
      icon: <AiOutlineProject size={21} />,
      label: 'Estimates',
      onClick: () => push('/dashboard/estimates'),
    },
    {
      key: '8',
      icon: <AiOutlineCluster size={21} />,
      label: 'Projects',
      onClick: () => push('/dashboard/projects'),
    },
    {
      key: '9',
      icon: <AiOutlinePercentage size={21} />,
      label: 'Taxes',
      onClick: () => push('/dashboard/taxes'),
    },

    {
      key: '10',
      icon: <AiOutlineSetting size={21} />,
      label: 'Settings',
      onClick: () => push('/dashboard/settings'),
    },
  ]

  /* handles selected menu item index */
  const [selectedeMenuItem, setSelectedMenuItem] = useState('1')
  useEffect(() => {
    const currentPath = paths.find((path) => pathname.includes(path.label))
    if (currentPath) {
      setSelectedMenuItem(currentPath.key)
    } else {
      setSelectedMenuItem('1')
    }
  }, [pathname])

  return (
    <Layout>
      <Sider width={275} trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0 }}>
        <div className='h-12 mb-6 flex items-center justify-center m-2 rounded-[2px]' style={{ background: '#f5f5f5' }}>
          <Image src='/logo/vistopic.png' height={48} width={collapsed ? 42 : 82} alt='visto logo image' />
        </div>
        <Menu theme='dark' mode='inline' selectedKeys={[selectedeMenuItem]} items={menu_items} />
      </Sider>
      <Layout>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', padding: 0, background: colorBgContainer }} className='flex items-center justify-between border-b shadow-sm'>
          <div className='flex items-center'>
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
            <BreadCrumbs />
          </div>
          <AccountAvatar />
        </Header>
        <Content style={{ margin: 16, padding: 24, borderRadius: 6, background: colorBgContainer }} className='border'>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Visto Consulting ©{new Date().getFullYear()} Created by Manel Rejeb.</Footer>
      </Layout>
    </Layout>
  )
}

const paths: { key: string; label: string; path: string }[] = [
  { key: '1', label: 'overview', path: '/dashboard' }, // Overview
  { key: '2', label: 'users', path: '/dashboard/users' }, // Users
  { key: '3', label: 'customers', path: '/dashboard/customers' }, // Customers
  { key: '4', label: 'articles', path: '/dashboard/articles' }, // Articles
  { key: '5', label: 'expenses', path: '/dashboard/expenses' }, // expenses
  { key: '6', label: 'invoices', path: '/dashboard/invoices' }, // Invoices
  { key: '7', label: 'estimates', path: '/dashboard/estimates' }, // Estimates
  { key: '8', label: 'projects', path: '/dashboard/projects' }, // Projects
  { key: '9', label: 'taxes', path: '/dashboard/taxes' }, // Taxes
  { key: '10', label: 'settings', path: '/dashboard/settings' }, // Settings
]
