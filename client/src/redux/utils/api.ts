import axios from 'axios'
import qs from 'qs'
import AppConsts from '@/shared/constants/appconstant'
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from './interceptors'

/* 

  headers: (headers, { getState }) => {
    const { auth } = getState()
    if (auth?.access_token) {
      headers['Authorization'] = `Bearer ${auth?.access_token}`
    }
    return headers
  },

*/

/*

export const axiosBaseQuery =
  ({ baseURL = '', headers }) =>
  async ({ url, params, method, data, responseType }, { signal, getState }) => {
    try {
      const result = await axios({
        url: baseURL + url,
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
      const err = axiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
}

*/

const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1YmRlMTUzODkxMzUxMDFiZTA1YjgiLCJpYXQiOjE3MTA0MTY5MDksImV4cCI6MTcxMjE0NDkwOX0.TMpHVLMtbUllTqjlr4316ozB5kS8k3wqF7-KTFWReAA'

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      // ${authToken} olacaq !!!
      `Bearer ${authToken}`,
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encode: false })
  },
})

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor)
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

export default http
