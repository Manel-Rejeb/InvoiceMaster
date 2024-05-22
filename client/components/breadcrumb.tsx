import { type FC } from 'react'
import { Breadcrumb } from 'antd/lib'
import { useRouter } from 'next/router'

export const BreadCrumbs: FC = () => {
  // TODO: needs more improvements
  const { pathname } = useRouter()

  return (
    <Breadcrumb
      separator='>'
      items={pathname
        .split('/')
        .filter((el) => el)
        .map((item) => ({ title: item, className: 'capitalize' }))}
    />
  )
}
