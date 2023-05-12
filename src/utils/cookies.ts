import Cookies from 'js-cookie'
import { IParamsCookies } from '@/interfaces'

export const setParamsCookies = (param: IParamsCookies) => {
  const dataParams = {
    page: '',
    ...param,
  }
  Cookies.set('params', JSON.stringify(dataParams))
}

export const getParamsCookies = () => {
  const dataParams = Cookies.get('params')
  if (dataParams) {
    return JSON.parse(dataParams) as IParamsCookies
  }
  return null
}
