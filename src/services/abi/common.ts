import { API_URL } from '@/constants'
import { fetch } from '../axios'

export const uploadFile = async (fromData: FormData) => {
  try {
    return await fetch.post(API_URL.upload, fromData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.warn('Upload image failure :', error)
    return undefined
  }
}
