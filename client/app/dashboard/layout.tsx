import '@/styles/_main.css'
import type { Metadata } from 'next'

import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

import {
  Fullscreen,
  ReceiptText,
  Puzzle,
  Folder,
  HandCoins,
  FileBarChart2,
  Users,
  CircleDollarSign,
  Settings,
  Gauge,
} from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!cookies().get('token')) {
    redirect('/login')
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <DashboardSidebar navigation={navigation_items} />
      <div className='flex flex-col'>
        <DashboardHeader navigation={navigation_items} />
        {children}
      </div>
    </div>
  )
}

// to add navigation items to sidebar of the dashboard
const navigation_items: { title: string; path: string; icon: React.ReactElement }[] = [
  { title: 'overview', path: '/dashboard', icon: <Gauge className='h-5 w-5' /> },
  // { title: 'services & products', path: '/dashboard/services', icon: <Fullscreen className='h-5 w-5' /> },

  { title: 'articles', path: '/dashboard/article', icon: <Fullscreen className='h-5 w-5' /> },
  { title: 'invoices', path: '/dashboard/invoices', icon: <ReceiptText className='h-5 w-5' /> },
  { title: 'vendors', path: '/dashboard/vendors', icon: <Puzzle className='h-5 w-5' /> },
  { title: 'customers', path: '/dashboard/customers', icon: <Users className='h-5 w-5' /> },
  { title: 'projects', path: '/dashboard/projects', icon: <Folder className='h-5 w-5' /> },
  { title: 'quotations', path: '/dashboard/quotations', icon: <FileBarChart2 className='h-5 w-5' /> },
  { title: 'expenses', path: '/dashboard/expenses', icon: <HandCoins className='h-5 w-5' /> },
  { title: 'taxes', path: '/dashboard/taxes', icon: <CircleDollarSign className='h-5 w-5' /> },
  { title: 'settings', path: '/dashboard/settings', icon: <Settings className='h-5 w-5' /> },
]
