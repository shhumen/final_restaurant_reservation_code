import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { setToken, setUserData } from '@/redux/features/auth/authSlice'
import { toast } from 'sonner'

const VALIDATOR = ['Users']

export const authApi = createApi({
  tagTypes: VALIDATOR,
  reducerPath: 'authApi',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          data,
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)

          dispatch(setToken(data))
        } catch (error: any) {
          toast.error(error.error.data.message || 'An error occurred')
        }
      },
      invalidatesTags: VALIDATOR,
    }),

    getMe: builder.query({
      query() {
        return {
          url: 'auth/me',
        }
      },
      providesTags: VALIDATOR,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserData(data))
        } catch (error: any) {
          toast.error('An error occurred')
        }
      },
    }),
    registerUser: builder.mutation({
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
    verifyOTP: builder.mutation({
      query(data) {
        return {
          url: 'users/verify-otp',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: VALIDATOR,
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)
        } catch (error: any) {
          toast.error(error.error.data.message || 'An error occurred')
        }
      },
    }),
  }),
})
export const {
  useLoginMutation,
  useGetMeQuery,
  useRegisterUserMutation,
  useVerifyOTPMutation,
} = authApi
