import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'

const VALIDATOR = ['Restaurant']

export const cuisinesApi = createApi({
  reducerPath: 'cuisinesApi',
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getCuisines: builder.query({
      query() {
        return {
          url: 'cuisines',
        }
      },
      providesTags: VALIDATOR,
    }),
  }),
})
export const { useGetCuisinesQuery } = cuisinesApi
