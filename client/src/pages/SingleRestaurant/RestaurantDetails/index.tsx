import { useGetFavListsQuery } from '@/redux/api/favorites'
import { useAppSelector } from '@/redux/store'
import FavList from '@/shared/components/Contents/Favorites/List'
import ModalComponent from '@/shared/components/Modal'
import ReservationCard from '@/shared/components/ReservationCard'
import About from '@/shared/components/RestaurantContents/About'
import Menu from '@/shared/components/RestaurantContents/Menu'
import Reviews from '@/shared/components/RestaurantContents/Reviews'
import ScrollToTop from '@/shared/components/ScrollToTop'
import IRestaurant from '@/shared/components/SingleRestaurantCard/types'
import { forkspoon, heart, location2, message, redHeart } from '@/shared/media'
import React, { useState } from 'react'

interface RestaurantDetailsProps {
  restaurant: IRestaurant
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  const { isAuthenticated, user_id } = useAppSelector((state) => state.auth)
  const actions = ['about', 'menu', 'reviews']
  const [selectedAction, setSelectedAction] = useState('about')
  const [step, setStep] = useState(3)

  const { data: favLists } = useGetFavListsQuery(user_id)

  const handleActionClick = (action: string) => {
    setSelectedAction(action)
  }

  const isRestaurantInFavList = (favLists: any, restaurantId: string) => {
    return favLists?.some((list: any) =>
      list.restaurants.includes(restaurantId)
    )
  }

  const isRestaurantFavorite = isRestaurantInFavList(favLists, restaurant?._id)

  return (
    <div className='restaurant-details container position-relative'>
      <ScrollToTop />
      <div className='row'>
        <div className='col-12 col-xl-6 col-md-6'>
          <div className='restaurant-head d-flex justify-space-between py-3'>
            <div>
              <h1 className='fw-400'>{restaurant?.restaurantName}</h1>
              <p className='fw-400'>{restaurant?.description}</p>
            </div>
            <div className='add-fav'>
              <ModalComponent
                okStyle='none'
                width='800px'
                button={
                  isRestaurantFavorite ? (
                    <img src={redHeart} alt='redheart' />
                  ) : (
                    <img src={heart} alt='favorite' />
                  )
                }
              >
                <div className='row'>
                  {favLists?.length === 0 && (
                    <h4 className=' fw-600 mx-1 text-center my-3 text-gray'>
                      There is no favorite list yet...
                    </h4>
                  )}
                  {favLists?.map((list: any) => (
                    <div
                      key={list?._id}
                      className='list p-3 col-12 col-sm-6 col-xl-6'
                    >
                      <FavList restaurantId={restaurant?._id} list={list} />
                    </div>
                  ))}
                </div>
              </ModalComponent>
            </div>
          </div>
          <div className='restaurant-info'>
            <div className='row'>
              <div className='col-6 d-flex flex-column'>
                <div className='address d-flex align-items-center'>
                  <span className='icon mr-1'>
                    <img src={location2} alt='location' />
                  </span>
                  <h3 className='fw-500 text-dec-underline py-1'>
                    {restaurant?.address?.street}
                  </h3>
                </div>
                <div className='cuisines d-flex align-items-center'>
                  <span className='icon mr-1'>
                    <img src={forkspoon} alt='forkspoon' />
                  </span>
                  <h3 className='fw-400 py-1'>
                    {restaurant?.cuisines
                      ?.map((cuisine: any) => cuisine.cuisineName)
                      .join(', ')}
                  </h3>
                </div>
              </div>
              <div className='col-6 d-flex flex-column align-items-end'>
                <h1 className='rating fw-400 d-flex justify-center align-items-center my-1'>
                  {restaurant?.averageRating}
                  <span style={{ fontSize: '12px' }}>/ 10</span>
                </h1>
                <div className='reviews-count'>
                  <span className='d-flex justify-center align-items-center'>
                    <img src={message} alt='reviews' />
                    <p className='px-1'>{restaurant?.reviews?.length}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='navigation-buttons my-2 position-sticky bg-white'>
            {actions.map((action) => (
              <button
                key={action}
                className={`border-none bg-transparent text-t-capitalize mr-1 fs-sm p-2 ${
                  selectedAction === action ? 'selected' : ''
                }`}
                onClick={() => handleActionClick(action)}
              >
                {action}
              </button>
            ))}
          </div>
          <div className='restaurant-contents my-4'>
            {selectedAction === 'about' && (
              <About restaurant={restaurant} setStep={setStep} step={step} />
            )}
            {selectedAction === 'menu' && (
              <div className='menu'>
                <Menu setStep={setStep} restaurant={restaurant} step={step} />
              </div>
            )}
            {selectedAction === 'reviews' && isAuthenticated && (
              <div className='reviews'>
                <Reviews restaurant={restaurant} />
              </div>
            )}
          </div>
        </div>
        <div className='col-12 col-xl-6 col-md-6 d-flex justify-center'>
          <ReservationCard restaurantId={restaurant?._id} />
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetails
