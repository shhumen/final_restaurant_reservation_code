import { useGetRestaurantsQuery } from '@/redux/api/restaurants'
import YandexMap from '@/shared/components/Map'
import SingleRestaurantCard from '@/shared/components/SingleRestaurantCard'
import IRestaurant from '@/shared/components/SingleRestaurantCard/types'
import React from 'react'
import { useLocation } from 'react-router-dom'

// interface FilterCriteria {
//   street?: string
//   cuisine?: string
//   search?: string
//   rating?: string
//   sortOrder?: string
//   page?: number
//   acceptingYums?: boolean
//   limit?: number
// }

const AllRestaurants: React.FC = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const streetName = queryParams.get('street')
  const searchText = queryParams.get('search') // Get the search text from query parameters

  const { data: restaurants } = useGetRestaurantsQuery({
    street: streetName,
    search: searchText,
  })

  const addresses = restaurants?.map(
    (restaurant: IRestaurant) => restaurant?.address?.street
  )

  console.log(addresses)

  return (
    <section className='container'>
      <h1 className='fw-600 text-center mt-3 mb-2 text-dark'>
        All Restaurants
      </h1>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
          <div className='row'>
            {restaurants?.map((restaurant: IRestaurant) => {
              return (
                <div className='singleRestaurant mt-1 card col-12 col-sm-12 col-md-6 col-lg-6'>
                  <SingleRestaurantCard
                    key={restaurant._id}
                    restaurantInfo={restaurant}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div
          className='col-12 col-sm-12 col-md-6 col-lg-6'
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position: 'sticky',
              top: '0',
              height: '100vh',
              overflow: 'hidden',
            }}
            className='yxmap_ my-2'
          >
            <YandexMap width='100%' height='130vh' addresses={addresses} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllRestaurants
