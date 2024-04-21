'use client'

import type { FC } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  CircleUser,
  Delete,
  Home,
  LineChart,
  LogOut,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { LOGOUT } from '@/app/(auth)/login/_actions/server-action'

type ComponentProps = {
  navigation: { title: string; path: string; icon: React.ReactElement }[]
}

export const DashboardHeader: FC<ComponentProps> = ({ navigation }) => {
  const pathname = usePathname()
  const { push } = useRouter()

  return (
    <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Invoice Master</span>
            </Link>
            {navigation.map((item, index: number) => (
              <Link
                key={index}
                href={item.path}
                className='flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all capitalize hover:text-primary'>
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <div className='mt-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size='sm' className='w-full'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1 flex gap-6 items-center justify-between'>
        <Breadcrumb>
          <BreadcrumbList>
            {pathname
              .split('/')
              .filter((path) => path != '')
              .map((path, index, paths) => {
                return (
                  <div
                    key={index}
                    className={`flex gap-1 items-center text-content-disabled last:text-content-display ${
                      index === paths.length - 1 ? 'font-[500]' : ''
                    }`}>
                    <BreadcrumbItem key={index}>
                      {pathname.split('/').slice(-1)[0] === path ? (
                        <BreadcrumbPage className='capitalize'>{path}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={`/${paths.slice(0, index + 1).join('/')}`} className='capitalize'>
                          {path}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < paths.length - 1 && <BreadcrumbSeparator />}
                  </div>
                )
              })}
          </BreadcrumbList>
        </Breadcrumb>

        <form className='w-full max-w-[350px]'>
          <div className='flex items-center relative'>
            <Search className='absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full appearance-none bg-background pl-8 shadow-none'
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <CircleUser className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => LOGOUT().then(() => push('/login'))}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
