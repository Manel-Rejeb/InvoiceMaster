import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/_main.css'
import { mr } from '@/lib/mr'
import { AuthFooter } from '@/components/footer/auth-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'login page',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={mr(inter.className, 'w-full h-screen flex')}>
      <div className='bg-white flex-1 flex items-center justify-center flex-col'>
        <div className='w-full flex-1 flex items-center justify-center p-4'>{children}</div>
        <div>
          <AuthFooter />
        </div>
      </div>
      <div className='bg-blue-500 flex-1 flex items-center justify-center bg-[url(/assets/bg-auth-image.png)] bg-no-repeat bg-cover bg-center'>
        <img className='w-[70%]' alt='auth-image' src='assets/auth-screens.png' />
      </div>
    </div>
  )
}
