import { IPagination } from "./common"

export interface TypeFormCreateCategory {
  title: string
  description: string
  avatar?: FileList
  background?: FileList
  attribute?: IAtrributes[]
}

export interface IDataCreateCategory {
  title: string
  description: string
  avatar: FileList
  background: FileList
  attribute: IAtrributes[] | []
}

export interface IDataPostCreateCategory {
  title: string
  description: string
  avatar: string
  background: string
  attribute: IAtrributes[] | []
}

export interface IParamsGetCategorys {
  page: number
  limit: number
}

export interface IAtrributes {
  key: string
  value: string
}

export interface IDetailCategory {
  attribute: IAtrributes[] | []
  avatar: string
  background: string
  description: string
  title: string
  _id: string
}

export interface IResponCategory {
  data: IDetailCategory[] | []
  pagination: IPagination
}
