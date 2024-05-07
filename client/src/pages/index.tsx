import { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Auxiliary from '@/shared/modules/Auxiliary'
import Header_ from '@/shared/layout/Header'
import Footer from '@/shared/layout/Footer'
import PrivateRoute from './PrivateRoute'
import { useAppSelector } from '@/redux/store'
import { useLocation } from 'react-router-dom'

const Router: React.FC = () => {
  const location = useLocation()

  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [isVisible, setIsVisible] = useState(true)

  const isHomepage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const threshold = 600

      if (scrollPosition > threshold) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Auxiliary>
      <Layout>
        {isHomepage ? (
          <Header_
            variant='sticky'
            isVisible={isVisible}
            isAuthenticated={isAuthenticated}
          />
        ) : (
          <Header_
            variant='normal'
            isVisible={false}
            isAuthenticated={isAuthenticated}
          />
        )}
        <PrivateRoute isVisible={isVisible} />
        <Footer />
      </Layout>
    </Auxiliary>
  )
}

export default Router
