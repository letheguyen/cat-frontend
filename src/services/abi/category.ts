import { API_URL } from '@/constants'
import { IDataPostCreateCategory, IDetailCategory, IParamsGetCategorys, IResponCategory, IResponsFetch } from '@/interfaces'
import { fetch } from '../axios'

export const createCategory = async (
  dataCreateCategory: IDataPostCreateCategory
) => {
  try {
    return await fetch.post(API_URL.categorys, dataCreateCategory) as IResponsFetch
  } catch (error) {
    return error as IResponsFetch
  }
}
 
export const getCategorys = async (params: IParamsGetCategorys) => {
  try {
    return await fetch.get(`${API_URL.categorys}?page=${params.page}&limit=${params.limit}`) as IResponCategory
  } catch (error) {
    return null
  }
}

export const getDetailCategory = async (id: string) => {
  try {
    return await fetch.get(`${API_URL.categorys}/${id}`) as IDetailCategory
  } catch (error) {
    return null
  }
}

export const deleteCategorys = async (id: string) => {
  try {
    return await fetch.delete(API_URL.categorys+'/'+id) as IResponCategory
  } catch (error) {
    return null
  }
}
