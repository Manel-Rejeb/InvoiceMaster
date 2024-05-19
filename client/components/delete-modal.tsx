import { FC } from 'react'
import { Modal } from 'antd/lib'

interface ComponentProps {
  title: string
  description: string
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

export const DeleteModal: FC<ComponentProps> = ({ title = 'modal', description, isModalOpen = false, handleOk, handleCancel }) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>{description}</p>
    </Modal>
  )
}
