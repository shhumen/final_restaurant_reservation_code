import { instagram, facebook, twitter, LogoFooter } from '@/shared/media'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='py-4 bg-primary'>
      <div className='container d-flex flex-column align-items-center justify-between'>
        <div className='row py-1'>
          <img src={LogoFooter} alt='logo' />
        </div>
        <div className='row py-1'>
          <ul className='footerNav d-flex justify-between'>
            <li className='px-1 fw-500 cursor-pointer'>
              <Link to='/' className='text-white'>
                Services
              </Link>
            </li>
            <li className='px-1 fw-500 cursor-pointer'>
              <Link to='/' className='text-white'>
                About Us
              </Link>
            </li>
            <li className='px-1 fw-500 cursor-pointer'>
              <Link to='/' className='text-white'>
                Contact Us
              </Link>
            </li>
            <li className='px-1 fw-500 cursor-pointer'>
              <Link to='/' className='text-white'>
                FAQs
              </Link>
            </li>
            <li className='px-1 fw-500 cursor-pointer'>
              <Link to='/' className='text-white'>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
        <div className='row py-1'>
          <ul className='social-media d-flex'>
            <li className='px-1'>
              <img src={instagram} alt='instagram' />
            </li>
            <li className='px-1'>
              <img src={twitter} alt='twitter' />
            </li>
            <li className='px-1'>
              <img src={facebook} alt='facebook' />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
