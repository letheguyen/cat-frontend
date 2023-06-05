import { IAtrributes } from './category'

export interface IDataShopInformation {
  avatar: FileList | string
  name: string
  description: string
  phone: string
  zalo: string
  facebook: string
  website: string
  attribute?: IAtrributes[]
}

export interface IDataShopInforStore {
  _id: string
  avatar: string
  name: string
  description: string
  phone: string
  zalo: string
  facebook: string
  website: string
  attribute?: IAtrributes[]
}
