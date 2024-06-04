import { type FC } from 'react'

import { Space, Avatar } from 'antd/lib'

import { useRouter } from 'next/router'
import { useAuth } from '@/providers/user-provider'

import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'

interface ComponentProps {
  collapse?: boolean
}

export const AccountAvatar: FC<ComponentProps> = ({ collapse = false }) => {
  const { push } = useRouter()
  const { logout, user } = useAuth()

  return (
    <div className='w-full flex items-center justify-between px-4 pb-4'>
      <button className='flex items-center gap-2 justify-center' onClick={(e) => e.preventDefault()}>
        <Avatar size={42} icon={<AiOutlineUser />} />
        {!collapse && (
          <div className='flex-1 leading-5'>
            <p className='w-full text-start capitalize font-medium'>{user?.username}</p>
            <p className='w-full text-start text-gray-400'>{user?.email}</p>
          </div>
        )}
      </button>
      {!collapse && (
        <button onClick={() => logout().then(() => push('/auth'))}>
          <AiOutlineLogout size={21} />
        </button>
      )}
    </div>
  )
}
