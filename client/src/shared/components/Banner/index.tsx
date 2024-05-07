import React from 'react'
import SelectComponent from '../Select'
import { IVisible } from '@/shared/models'

const Banner: React.FC<IVisible> = ({ isVisible }) => {
  return (
    <section className='container-xxl container py-3 '>
      <div className='banner my-4 w-100 br-lg position-relative d-flex justify-center'>
        <div className='reserv mx-3 bg-primary br-md position-absolute w-90'>
          {isVisible && <SelectComponent />}
        </div>
      </div>
    </section>
  )
}

export default Banner
