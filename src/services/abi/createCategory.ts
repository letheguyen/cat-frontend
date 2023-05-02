import { API_URL } from '@/constants'
import { IDataPostCreateCategory, IResponsFetch } from '@/interfaces'
import { fetch } from '../axios'

export const createCategory = async (
  dataCreateCategory: IDataPostCreateCategory
) => {
  try {
    return await fetch.post(API_URL.createCategory, dataCreateCategory) as IResponsFetch
  } catch (error) {
    return error as IResponsFetch
  }
}
 