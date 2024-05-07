import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RenderIf from '@/shared/components/RenderIf'
import Home from './Home'
import { IVisible } from '@/shared/models'
import RestaurantPage from './SingleRestaurant'
import RestaurantLogin from './RestaurantLogin'

const AllRestaurants = lazy(() => import('./AllRestaurants'))
// const RestaurantPage = lazy(() => import('./SingleRestaurant'))
const FavoritesPage = lazy(
  () => import('@/shared/components/Contents/Favorites/FavoritesPage')
)

const PrivateRoute: React.FC<IVisible> = ({ isVisible }) => {
  const roleName = 'restaurant'
  return (
    <RenderIf conditions={!!roleName}>
      <Routes>
        {/* {roleName === 'restaurant' ? (
          <>
            <Route
              path='/admin/login'
              //   element={<DailyReports role={roleName} />} ADMIN LOGIN PAGE
            />
          </>
        ) : ( 
        */}
        {/* {roleName === 'restaurant' ? (
          <Route path='admin/login' element={<RestaurantLogin />} />
        ) : (
          <>
            <Route path='/' element={<Home isVisible={isVisible} />} />
            <Route path='restaurant/:id' element={<RestaurantPage />} />
          </>
        )} */}
        <Route path='/' element={<Home isVisible={isVisible} />} />
        <Route path='restaurants/:id' element={<RestaurantPage />} />
        <Route path='/favorites/:id' element={<FavoritesPage />} />
        <Route path='/restaurants' element={<AllRestaurants />} />
        <Route path='restaurant-register' element={<RestaurantLogin />} />
      </Routes>
    </RenderIf>
  )
}

export default PrivateRoute
