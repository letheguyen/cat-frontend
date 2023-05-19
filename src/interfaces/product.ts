import { IAtrributes } from './category'
import { IPagination } from './common'
export interface IResponProducts {
  pagination: IPagination
  data: IDataProducts[] | []
}
export interface ITypeUseFormCreateProduct {
  category: string
  title: string
  description: string
  attribute: IAtrributes[] | []
  images: Images[]
  detailSizeType: DetailSizeType[]
}
export interface IDataPostCreateProduct {
  category: string
  title: string
  description: string
  attribute: IAtrributes[] | []
  images: ImagesResult[]
  detailSizeType: DetailSizeType[]
}
export interface IDataProducts {
  _id: string
  category: string
  title: string
  description: string
  attribute: IAtrributes[] | []
  images: ImagesResult[]
  detailSizeType: DetailSizeTypeRes[]
}
export interface Images {
  image?: FileList
  attribute: string
}
export interface ImagesResult {
  image: string
  attribute: string
}
export interface DetailSizeType {
  sizeAndType: string
  quantity: number | undefined
  price: number | undefined
}
export interface DetailSizeTypeRes {
  sizeAndType: string
  quantity: number
  price: number
}
