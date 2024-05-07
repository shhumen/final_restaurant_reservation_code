import { IDrawer } from '@/shared/models'
import { Button, Drawer } from 'antd'
import React from 'react'
import { createPortal } from 'react-dom'

const Drawer_: React.FC<IDrawer> = ({
  title,
  children,
  open,
  setOpen,
  button,
  width,
}) => {
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button className={button} type='primary' onClick={showDrawer}>
        {button}
      </Button>

      {createPortal(
        <Drawer
          title={title}
          onClose={onClose}
          open={open}
          style={{ width: `${width}` }}
        >
          {children}
        </Drawer>,
        document.body
      )}
    </>
  )
}

export default Drawer_
