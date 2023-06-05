import { API_URL } from '@/constants'
import { fetch } from '../axios'
import {
  IDataShopInforStore,
  IDataShopInformation,
  IResponsFetch,
} from '@/interfaces'

export const updateInformation = async (data: IDataShopInformation) => {
  try {
    return (await fetch.put(API_URL.shopInformation, data)) as IResponsFetch
  } catch (error) {
    return error as IResponsFetch
  }
}

export const getInformation = async () => {
  try {
    return (await fetch.get(API_URL.getShopInfo)) as IDataShopInforStore[]
  } catch (error) {
    return null
  }
}
