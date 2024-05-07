import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { toast } from 'sonner'

const VALIDATOR = ['Restaurant']

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query(filters = {}) {
        return {
          url: 'restaurants',
          params: filters,
        }
      },
      providesTags: VALIDATOR,
    }),
    getRestaurant: builder.query({
      query(restaurantId) {
        return {
          url: `restaurants/${restaurantId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    getAddresses: builder.query({
      query() {
        return {
          url: 'restaurants/addresses',
        }
      },
      providesTags: VALIDATOR,
    }),
    getPeriodTimes: builder.query({
      query(restaurantId) {
        return {
          url: `periodTimes/${restaurantId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    registerRestaurant: builder.mutation({
      query(data) {
        return {
          url: 'users',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)

          dispatch(setToken(data))
        } catch (error: any) {
          toast.error(error.error.data.message || 'An error occurred')
        }
      },
    }),
  }),
})
export const {
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useGetAddressesQuery,
  useGetPeriodTimesQuery,
  useRegisterRestaurantMutation,
} = restaurantApi
