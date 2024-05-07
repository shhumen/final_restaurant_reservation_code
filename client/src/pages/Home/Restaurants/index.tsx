import React from 'react'
import { useGetRestaurantsQuery } from '@/redux/api/restaurants'
import SingleRestaurantCard from '@/shared/components/SingleRestaurantCard'
import IRestaurant from '@/shared/components/SingleRestaurantCard/types'

const Restaurants: React.FC = () => {
  const { data: restaurants } = useGetRestaurantsQuery(null)
  return (
    <section className='container'>
      <div className='restaurants pt-3 my-2'>
        <div className=' d-flex align-items-center '>
          <h1 className='text-start text-primary p-1 fw-700'>
            Featured restaurants near you
          </h1>
        </div>
        <div className='row justify-between'>
          {restaurants?.map((restaurant: IRestaurant) => {
            return (
              <div className='singleRestaurant card col-12 col-sm-6 col-md-6 col-lg-3'>
                <SingleRestaurantCard
                  key={restaurant._id}
                  restaurantInfo={restaurant}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Restaurants
