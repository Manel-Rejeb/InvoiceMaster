import { type FC } from 'react'
import { AiOutlineUser, AiOutlineSetting, AiOutlineClose } from 'react-icons/ai'
import { type MenuProps, Dropdown, Space, Avatar } from 'antd/lib'
import { useAuth } from '@/providers/user-provider'
import { useRouter } from 'next/router'

interface ComponentProps {}

export const AccountAvatar: FC<ComponentProps> = ({}) => {
  const { push } = useRouter()
  const { logout } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className='capitalize flex items-center gap-2'>
          <AiOutlineUser size={18} />
          <p>profile</p>
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <div className='capitalize flex items-center gap-2'>
          <AiOutlineSetting size={18} />
          <p>settings</p>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: (
        <div onClick={() => logout().then(() => push('/auth'))} className='capitalize flex items-center gap-2'>
          <AiOutlineClose />
          <p>logout</p>
        </div>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <button className='h-16 w-16 flex items-center justify-center' onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={42} icon={<AiOutlineUser />} />
        </Space>
      </button>
    </Dropdown>
  )
}
