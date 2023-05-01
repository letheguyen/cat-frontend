import axios from 'axios'
import Cookies from 'js-cookie'

const handleGetToken = () => {
  if (!Cookies.get('tokenId')) return undefined
  return 'Bearer' + ' ' + Cookies.get('tokenId')
}

export const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1202',
  headers: {
    Authorization: handleGetToken(),
    'Content-Type': 'application/json',
  },
})

export const fetchProvinces = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROVINCES,
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
