import { Modal } from 'antd'
import React, { useState } from 'react'

interface IModalComponentProps {
  width?: string
  title?: string
  button: string | React.ReactNode
  children: React.ReactNode
  onOkFunction?: () => void
  okText?: string
  okStyle?: string
}

const ModalComponent: React.FC<IModalComponentProps> = ({
  width,
  title,
  button,
  children,
  okText,
  okStyle,
  onOkFunction,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <button
        className='modal-btn bg-transparent border-none'
        onClick={() => setModalOpen(true)}
      >
        {button}
      </button>
      <Modal
        width={width}
        centered
        title={title}
        open={modalOpen}
        cancelButtonProps={{ className: 'cancel' }}
        okButtonProps={{
          className: `${okStyle ? 'd-none' : 'create'}`,
        }}
        okText={okText || 'Create'}
        onOk={onOkFunction}
        onCancel={() => setModalOpen(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default ModalComponent
