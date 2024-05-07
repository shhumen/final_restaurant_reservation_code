import React from 'react'
import IRestaurant from '../../SingleRestaurantCard/types'

interface MenuProps {
  restaurant: IRestaurant
  step: number
  setStep: Function
}

const Menu: React.FC<MenuProps> = ({ restaurant, step, setStep }) => {
  const handleShowMore = () => {
    if (restaurant?.menu?.[0]?.menuDescription?.length >= step) {
      setStep((prev: number) => prev + 2)
    } else {
      setStep(restaurant?.menu?.[0]?.menuDescription?.length)
    }
  }
  return (
    <div className='menu'>
      {restaurant?.menu?.[0]?.menuDescription
        ?.slice(0, step)
        .map((menu, index) => (
          <div key={index} className='my-2'>
            <div className='name-price d-flex justify-space-between align-items-center'>
              <h3 className='fw-600'>{menu?.dishName}</h3>
              <hr className='dashed-line' />
              <p className='fw-600'>$ {menu?.dishPrice}</p>
            </div>
            <div className='desc text-gray'>
              <p>{menu?.dishDescription?.substring(0, 55)}...</p>
            </div>
          </div>
        ))}
      <button
        className='bg-transparent border-none py-2 fw-500 fs-sm text-primary'
        onClick={handleShowMore}
      >
        {step >= restaurant?.menu?.[0]?.menuDescription?.length
          ? ''
          : 'Show More'}
      </button>
    </div>
  )
}

export default Menu
