import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

interface BreadCrumbProps {
  pathname: string
  restaurantName?: string
}

interface BreadcrumbItem {
  href?: string
  title: React.ReactNode
}

const BreadCrumbComponent: React.FC<BreadCrumbProps> = ({
  pathname,
  restaurantName,
}) => {
  const pathSegments = pathname.split('/').filter((segment) => segment !== '')
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      href: '/',
      title: <HomeOutlined />,
    },
  ]

  let path = ''
  for (let i = 0; i < pathSegments.length; i++) {
    path += `/${pathSegments[i]}`
    const isLast = i === pathSegments.length - 1
    if (isLast) {
      breadcrumbItems.push({ title: restaurantName || 'Restaurant' })
    } else {
      breadcrumbItems.push({
        href: path,
        title: pathSegments[i],
      })
    }
  }

  return (
    <Breadcrumb
      className='my-2 mx-2'
      separator=' / '
      items={breadcrumbItems.map((item) => ({
        ...item,
        link: item.href ? <Link to={item.href}>{item.title}</Link> : undefined,
      }))}
    />
  )
}

export default BreadCrumbComponent
