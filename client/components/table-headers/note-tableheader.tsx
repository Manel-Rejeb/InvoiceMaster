import React, { type FC, type ChangeEvent, useEffect, useMemo, useState } from 'react'
import { LuTrash } from 'react-icons/lu'
import { Button, Popconfirm, Table, TableColumnsType, Input, type FormInstance } from 'antd'

import { AiOutlinePlus } from 'react-icons/ai'

interface ComponentProps {
  form: FormInstance
  notes: { note: string }[]
  setNotes: (value: { note: string }[]) => void
}
export const NoteTableHeader: FC<ComponentProps> = ({ form, notes, setNotes }) => {
  useEffect(() => {
    form.setFieldValue('notes', notes)
  }, [notes])

  useEffect(() => {
    form.setFieldValue('estimate_notes', notes)
  }, [notes])

  const handleFieldChange = (field: keyof { note: string }, value: string, index: number) => {
    const newNotes = [...notes]
    newNotes[index] = { ...newNotes[index], [field]: value }
    setNotes(newNotes)
  }

  const addItem = () => {
    const newNotes = [
      ...notes,
      {
        note: '',
      },
    ]
    setNotes(newNotes)
  }

  const removeItem = (index: number) => setNotes(notes.filter((_, i) => i !== index))

  const notesColumns: TableColumnsType<{ note: string }> = [
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (text, __, index) => <Input placeholder='New note' value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldChange('note', e.target.value, index)} />,
      width: '90%',
    },
    {
      title: 'Action',
      align: 'right',
      render: (_, __, index) => (
        <Popconfirm title='Delete the item' description='Are you sure to delete this item?' okText='Yes' cancelText='No' onConfirm={() => removeItem(index)}>
          <Button icon={<LuTrash size={18} />} danger />
        </Popconfirm>
      ),
      width: '10%',
    },
  ]

  return (
    <div>
      <Table size='small' columns={notesColumns} dataSource={notes} bordered pagination={false} />
      <Button type='text' block onClick={addItem}>
        <div className='flex items-center justify-center gap-2'>
          <AiOutlinePlus />
          <p>Add Item</p>
        </div>
      </Button>
    </div>
  )
}
