'use client'

import type { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ComponentProps = {
  navigation: { title: string; path: string; icon: React.ReactElement }[]
}

export const DashboardSidebar: FC<ComponentProps> = ({ navigation }) => {
  const pathname = usePathname()

  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>Acme Inc</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4 gap-1'>
            {navigation.map((item, index: number) => (
              <Link
                key={index}
                href={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 transition-all capitalize hover:bg-blue-50 hover:text-primary',
                  item.path === '/dashboard'
                    ? pathname === '/dashboard'
                      ? 'bg-blue-50 text-primary'
                      : 'text-muted-foreground'
                    : pathname.includes(item.path)
                    ? 'bg-blue-50 text-primary'
                    : 'text-muted-foreground'
                )}>
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className='mt-auto p-4'>
          <Card>
            <CardHeader className='p-2 pt-0 md:p-4'>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
              <Button size='sm' className='w-full'>
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
