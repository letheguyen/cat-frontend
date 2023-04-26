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
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
})

fetch.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 500:

        break

      default:
        return response
    }
    return response
  },
  (error) => {
    console.log('Fetch data error :',error.response.data)
    return Promise.reject(error)
  }
)
