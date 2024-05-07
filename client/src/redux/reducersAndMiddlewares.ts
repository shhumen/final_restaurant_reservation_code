import { authApi } from './api/auth'
import { cuisinesApi } from './api/cuisines'
import { favortiesApi } from './api/favorites'
import { reservationApi } from './api/reservation'
import { restaurantApi } from './api/restaurants'
import { reviewsApi } from './api/reviews'
import { usersApi } from './api/users'
import authReducer from './features/auth/authSlice'

export const reducers = {
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  [cuisinesApi.reducerPath]: cuisinesApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
  [favortiesApi.reducerPath]: favortiesApi.reducer,
  [reservationApi.reducerPath]: reservationApi.reducer,
}

export const middlewares = [
  authApi.middleware,
  usersApi.middleware,
  restaurantApi.middleware,
  cuisinesApi.middleware,
  reviewsApi.middleware,
  reservationApi.middleware,
  favortiesApi.middleware,
]
