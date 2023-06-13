import { IPagination } from './common'

export interface IMessager {
  width?: string
  height?: string
  className?: string
}
export interface IChatContent {
  content: string
  idUser: string
  image?: string | null
  avatar?: string
}
export interface IDataAccount {
  _id: string
  userName: string
  avatar: string | undefined
}
export interface IDataRoom {
  _id: string
  name: string
  userId: string
  seller: string
  roomImage: string
}

export interface IResponseRooms {
  data: IDataRoom[]
  pagination: IPagination
}
export interface IParamsGetRooms {
  page: number
  limit: number
}

export interface IResponseDetailRoom {
  data: IDataMessge[]
  pagination: IPagination
}
export interface IDataMessge {
  message: string
  idRoom: string
  from: string
  to: string
  created: number
  _id: string
  idUserCreate: string
}
export interface IPropsFormSend {
  onSubmit: (message: string) => void
  isSendAdmin?: boolean
}

export interface IAllRoomDetail {
  data: IRoomDetail[] | []
  pagination: IPagination
}
export interface IRoomDetail {
  _id: string
  name: string
  userId: string
  seller: string
  roomImage: string
}
