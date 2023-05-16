import { API_URL } from '@/constants'
import { IDataPostCreateProduct, IResponsFetch } from '@/interfaces'
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
