import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { toast } from 'sonner'

const VALIDATOR = ['Users']

export const usersApi = createApi({
  tagTypes: VALIDATOR,
  reducerPath: 'usersApi',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query() {
        return {
          url: 'users',
        }
      },
      providesTags: VALIDATOR,
    }),
    getUser: builder.query({
      query(user_id) {
        return {
          url: `users/${user_id}`,
        }
      },
      providesTags: VALIDATOR,
    }),
    updateUser: builder.mutation({
      query({ user_id, data }) {
        return {
          url: `users/${user_id}`,
          method: 'PATCH',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => toast.success(response.message),
    }),
    deleteUser: builder.mutation({
      query(userId) {
        return {
          url: `users/${userId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: VALIDATOR,
      transformResponse: (response: any) => {
        response
        toast.success(response.message)
      },
    }),
  }),
})
export const {
  useUpdateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
} = usersApi
