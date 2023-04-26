import { API_URL } from '@/constants'
import { fetch } from '../axios'

export const getAllUsers = async () => {
  try {
    return await fetch.get(API_URL.users)
  } catch (error) {
    console.log('Get all users error :', error)
    return error
  }
}

export const signUp = async (dataForm: FormData) => {
  try {
    return await fetch.post(API_URL.signUp, dataForm)
  } catch (error) {
    console.log('Sign up error :', error)
    return error
  }
}
