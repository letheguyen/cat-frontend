import { API_URL } from '@/constants'
import { fetch } from '../axios'
import { DataPostSignUp, IResponsFetch, ISignInData } from '@/interfaces'

export const getAllUsers = async () => {
  try {
    return await fetch.get(API_URL.users)
  } catch (error) {
    return null
  }
}

export const signUp = async (data: DataPostSignUp) => {
  try {
    return (await fetch.post(API_URL.signUp, data)) as IResponsFetch
  } catch (error) {
    return error as IResponsFetch
  }
}

export const signIn = async (data: ISignInData) => {
  try {
    return (await fetch.post(API_URL.signIn, data))
  } catch (error) {
    return error
  }
}

