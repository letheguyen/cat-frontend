import { API_URL } from '@/constants'
import {
  IDataPostCreateProduct,
  IQuery,
  IResponProduct,
  IResponsFetch,
} from '@/interfaces'
import { fetch } from '../axios'

export const createProduct = async (
  dataCreateProduct: IDataPostCreateProduct
) => {
  try {
    return (await fetch.post(
      API_URL.product,
      dataCreateProduct
    )) as IResponsFetch
  } catch (error) {
    return error as IResponsFetch
  }
}

export const getProduct = async (params?: IQuery) => {
  try {
    return (await fetch.get(API_URL.product, {
      params: { ...params },
    })) as IResponProduct
  } catch (error) {
    return null
  }
}
