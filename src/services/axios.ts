import { KEY_TOKEN_COOKIE } from '@/constants'
import axios from 'axios'
import Cookies from 'js-cookie'

export const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: Cookies.get(KEY_TOKEN_COOKIE) as string,
    'Content-Type': 'application/json',
  },
})

fetch.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 500:
        break

      default:
        return response.data
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error.response?.data)
  }
)
