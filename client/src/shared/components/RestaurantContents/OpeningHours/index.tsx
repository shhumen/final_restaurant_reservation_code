import React from 'react'
import IRestaurant from '../../SingleRestaurantCard/types'

interface OpeningHoursProps {
  restaurant: IRestaurant
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ restaurant }) => {
  const today = new Date().getDay()

  return (
    <div className='openingHours'>
      <h1 className='fw-600 my-2'>Opening Hours</h1>
      {restaurant?.openingHours.map((hour, index) => {
        const isTuesday = index === today - 1
        const fontWeight = isTuesday ? 600 : 400 // Set font weight to 600 if it's Tuesday, otherwise 400

        return (
          <div className='d-flex' key={index}>
            <p className={`fw-${fontWeight} days m-1`}>{hour?.day}</p>
            <p className={`m-1 fw-${fontWeight}`}>
              {hour?.openTime}AM-{hour?.closeTime}PM
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default OpeningHours
