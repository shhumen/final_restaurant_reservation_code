import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { toast } from 'sonner'

const VALIDATOR = ['Reviews']

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getReviews: builder.query({
      query() {
        return {
          url: 'reviews',
        }
      },
      providesTags: VALIDATOR,
    }),
    getReview: builder.query({
      query(restaurant_id) {
        return {
          url: `reviews/${restaurant_id}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    getReviewOfUser: builder.query({
      query(userId) {
        return {
          url: `reviews/user/${userId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    updateReview: builder.mutation({
      query({ userId, data }) {
        return {
          url: `reviews/${userId}`,
          method: 'PUT',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    addReview: builder.mutation({
      query(data) {
        return {
          url: `reviews`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    deleteReview: builder.mutation({
      query(reviewId) {
        return {
          url: `reviews/${reviewId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useGetReviewOfUserQuery,
  useGetReviewQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddReviewMutation,
} = reviewsApi
