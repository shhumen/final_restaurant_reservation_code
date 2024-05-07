import Login from '@/pages/Login'
import Profile from '@/shared/components/Profile'
import SelectComponent from '@/shared/components/Select'
import { Logo } from '@/shared/media'
import { HeaderProps } from '@/shared/models'
import React from 'react'
import { Link } from 'react-router-dom'

const Header_: React.FC<HeaderProps> = ({
  variant,
  isVisible,
  isAuthenticated,
}) => {
  return (
    <>
      <header
        className={`header container-fluid pos position-${variant}  ${
          isVisible && 'py-2'
        }`}
      >
        <div className='container d-flex align-items-center'>
          <div className='logo'>
            <Link to='/'>
              <img src={Logo} alt='DineSpot' />
            </Link>
          </div>
          <div className='searchbar d-flex justify-center w-100'>
            {!isVisible && <SelectComponent />}
          </div>

          {isAuthenticated ? <Profile /> : <Login />}
        </div>
      </header>
    </>
  )
}

export default Header_
