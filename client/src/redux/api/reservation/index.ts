import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { toast } from 'sonner'

const VALIDATOR = ['Reservation']

export const reservationApi = createApi({
  reducerPath: 'reservationApi',
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getReservations: builder.query({
      query() {
        return {
          url: 'reservation',
        }
      },
      providesTags: VALIDATOR,
    }),
    getReservation: builder.query({
      query(restaurantId) {
        return {
          url: `reservation/${restaurantId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    addReservation: builder.mutation({
      query(data) {
        return {
          url: 'reservation',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    updateReservation: builder.mutation({
      query({ reservationId, data }) {
        return {
          url: `reservation/${reservationId}`,
          method: 'PUT',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
  }),
})
export const {
  useGetReservationQuery,
  useGetReservationsQuery,
  useAddReservationMutation,
  useUpdateReservationMutation,
} = reservationApi
