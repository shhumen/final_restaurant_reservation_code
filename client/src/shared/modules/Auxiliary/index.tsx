import { Layout } from 'antd'
import React from 'react'

interface AuxProps {
  children: React.ReactNode
}

const Auxiliary: React.FC<AuxProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}
export default Auxiliary
