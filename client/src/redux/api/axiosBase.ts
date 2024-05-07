import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { v4 as uuid } from 'uuid'
// import { setToken } from '../features/auth/authSlice'
import { ErrorCode } from '@/shared/constants/errorCode'
// import { RootState } from '../store'
import { logout } from '../features/auth/authSlice'
import { toast } from 'sonner'

const baseURL = `${import.meta.env.VITE_APP_REMOTE_SERVICE_BASE_URL}/`

const errorNotifier = (message?: string) => {
  toast.error(message)
}

interface IAxiosBaseQuery {
  baseUrl?: string
  headers?: (
    headers: { [key: string]: string },
    store: { getState: any; signal: any }
  ) => { [key: string]: string }
}

interface IBaseQuery {
  url: string
  params?: AxiosRequestConfig['params']
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  responseType?: string
  error?: {
    status: number
    data: any
  }
}

export const axiosBaseQuery = ({
  headers,
  baseUrl = '',
}: IAxiosBaseQuery): BaseQueryFn<
  IBaseQuery,
  unknown,
  {
    status?: number
    data?: any
    error?: {
      status: number | string
      data: any
    }
  }
> => {
  return async (
    { url, params, method, data, responseType },
    { signal, getState }
  ) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method: method ? method : 'GET',
        ...(params && { params: params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
        ...(data && { data: data }),
        responseType: responseType ? responseType : 'json',
      })
      return {
        data: result.data,
      }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
}

export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseUrl: baseURL,
  headers: (headers, { getState }) => {
    const state = getState() // Log the entire state to see its structure
    const { token } = state.auth
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    headers['x-requestid'] = uuid()
    return headers
  },
})

export const APIBaseQuery: BaseQueryFn<IBaseQuery, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  const result = await APIBaseQueryInterceptor(args, api, extraOptions)
  if (result.error && result.error.status === ErrorCode.UNAUTHORIZED) {
    const state: any = api
    errorNotifier(result.error.data)
    state.dispatch(logout())
  } else if (result.error && result.error.status === ErrorCode.FORBIDDEN) {
    errorNotifier('403 FORBIDDEN')
    api.dispatch(logout())
  } else if (result.error) {
    errorNotifier(
      result.error?.data?.message ||
        result.error?.data?.error ||
        'Xəta baş verdi'
    )
  }
  return result
}
