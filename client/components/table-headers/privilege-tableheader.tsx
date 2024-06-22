import React, { FC, useEffect } from 'react'
import { LuTrash } from 'react-icons/lu'
import { Button, Popconfirm, Table, TableColumnsType, Checkbox } from 'antd'
import { AiOutlinePlus } from 'react-icons/ai'
import { type FormInstance } from 'antd'

interface ComponentProps {
  form: FormInstance
  privileges: string[]
  setPrivileges: (value: string[]) => void
}

const predefinedPrivileges: string[] = ['CAN_MANAGE_CUSTOMERS', 'CAN_MANAGE_ARTICLES', 'CAN_MANAGE_TAXES', 'CAN_MANAGE_ESTIMATES', 'CAN_MANAGE_INVOICES', 'CAN_MANAGE_PROJECTS']

export const PrivilegeTableHeader: FC<ComponentProps> = ({ form, privileges, setPrivileges }) => {
  useEffect(() => {
    form.setFieldValue('privilege', privileges)
  }, [privileges, form])

  const handleCheckboxChange = (privilege: string, checked: boolean) => {
    const newPrivileges = checked ? [...privileges, privilege] : privileges.filter((p) => p !== privilege)
    setPrivileges(newPrivileges)
  }

  const columns: TableColumnsType<{ privilege: string }> = [
    {
      title: 'Privilege',
      dataIndex: 'privilege',
      key: 'privilege',
      render: (text) => text,
      width: '95%',
    },
    {
      title: 'Enabled',
      key: 'enabled',
      align: 'right',
      render: (_, record) => <Checkbox checked={privileges.includes(record.privilege)} onChange={(e) => handleCheckboxChange(record.privilege, e.target.checked)} />,
      width: '5%',
    },
  ]

  const dataSource = predefinedPrivileges.map((privilege) => ({ privilege }))

  return (
    <div>
      <Table size='small' columns={columns} dataSource={dataSource} rowKey='privilege' bordered pagination={false} />
    </div>
  )
}
