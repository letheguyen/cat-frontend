import { IAtrributes } from './category'

export interface ITypeUseFormCreateProduct {
  category: string
  title: string
  description: string
  images: Images[]
  attribute: IAtrributes[] | []
}

export interface IDataPostCreateProduct {
  category: string
  title: string
  description: string
  images: ImagesResult[]
  attribute: IAtrributes[] | []
}

export interface Images {
  image?: FileList
  attribute: string
  detailSizeType: DetailSizeType[]
}

export interface ImagesResult {
  image: string
  attribute: string
  detailSizeType: DetailSizeType[]
}

export interface DetailSizeType {
  sizeAndType: string
  quantity: number
}
