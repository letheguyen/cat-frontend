import { STATUS_CATEGORY } from '@/constants'
import { IPagination, ValueOf } from './common'

export type IStatusCategory = ValueOf<typeof STATUS_CATEGORY>

export interface TypeFormCreateCategory {
  title: string
  avatar?: FileList
  description: string
  background?: FileList
  attribute?: IAtrributes[]
}

export interface IDataCreateCategory {
  title: string
  avatar: FileList
  description: string
  background: FileList
  attribute: IAtrributes[] | []
}
export interface IDataPostCreateCategory {
  title?: string
  avatar: string | FileList
  background: string | FileList
  description: string
  attribute: IAtrributes[] | []
}

export interface IParamsGetCategorys {
  page?: number
  limit?: number
}

export interface IAtrributes {
  key: string
  value: string
}

export interface IDetailCategory {
  _id: string
  title: string
  avatar: string
  background: string
  description: string
  attribute: IAtrributes[] | []
  productsCount: number
  status: IStatusCategory
}

export interface IResponCategory {
  pagination: IPagination
  data: IDetailCategory[] | []
}
