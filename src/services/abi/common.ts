import { API_URL } from '@/constants'
import { fetch } from '../axios'

export const uploadFile = async (fromData: FormData) => {
  try {
    const {data} = await fetch.post(API_URL.upload, fromData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  } catch (error) {
    console.log('Get all users error :', error)
    return error
  }
}
