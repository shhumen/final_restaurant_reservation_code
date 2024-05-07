import React from 'react'
import { restaurantImg } from '@/shared/media'
import IRestaurant from './types'
import { Link, useLocation } from 'react-router-dom'

interface SingleRestaurantCardProps {
  restaurantInfo: IRestaurant
}

const SingleRestaurantCard: React.FC<SingleRestaurantCardProps> = ({
  restaurantInfo,
}) => {
  const location = useLocation()

  return (
    // <div className='singleRestaurant card col-12 col-sm-6 col-md-6 col-lg-3'>
    <Link to={`/restaurants/${restaurantInfo?._id}`}>
      <div className='card br-sm'>
        <div className='card-img'>
          <img src={restaurantImg} alt='restaurants' />
        </div>
        <div className='card-body py-2 px-1 d-flex justify-space-between'>
          <div className='address'>
            <div className='city'>
              <h4 className='text-primary'>{restaurantInfo?.restaurantName}</h4>
            </div>
            <div className='street'>
              <p className='text-gray'>
                {`${restaurantInfo?.address?.city}  ${restaurantInfo?.address?.street}`}
              </p>
            </div>
          </div>
          <button className='rating bg-primary border-none br-sm'>
            {restaurantInfo?.averageRating}
          </button>
        </div>
        <div className='card-footer px-1 pb-3'>
          <p className='text-gray'>
            {/* <span className='fw-700'>9:00</span> AM -{' '}
            <span className='fw-700'>00:00</span> PM */}
            <span>{restaurantInfo?.openingHours[0]?.openTime} </span>
            <span>- {restaurantInfo?.openingHours[0]?.closeTime}</span>
          </p>
        </div>
      </div>
    </Link>
    // </div>
  )
}

export default SingleRestaurantCard
