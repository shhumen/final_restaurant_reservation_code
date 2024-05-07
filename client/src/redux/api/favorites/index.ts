import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { toast } from 'sonner'

const VALIDATOR = ['Favorites']

export const favortiesApi = createApi({
  reducerPath: 'favortiesApi',
  baseQuery: APIBaseQuery,
  tagTypes: VALIDATOR,
  endpoints: (builder) => ({
    getFavLists: builder.query({
      query(userId) {
        return {
          url: `favorites/lists?userId=${userId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    getFavList: builder.query({
      query(listId) {
        return {
          url: `favorites/lists/${listId}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    addList: builder.mutation({
      query(data) {
        return {
          url: `favorites/lists`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    updateFavList: builder.mutation({
      query({ listId, data }) {
        return {
          url: `favorites/lists/${listId}`,
          method: 'PUT',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    deleteFavList: builder.mutation({
      query(listId) {
        return {
          url: `favorites/lists/${listId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    addRestaurantToFavList: builder.mutation({
      query({ listId, restaurantId }) {
        return {
          url: `favorites/lists/${listId}/restaurants/${restaurantId}`,
          method: 'POST',
        }
      },
      transformResponse: (response: any) => toast.success(response.message),
      invalidatesTags: VALIDATOR,
    }),
  }),
})

export const {
  useGetFavListsQuery,
  useAddListMutation,
  useGetFavListQuery,
  useAddRestaurantToFavListMutation,
  useUpdateFavListMutation,
  useDeleteFavListMutation,
} = favortiesApi
