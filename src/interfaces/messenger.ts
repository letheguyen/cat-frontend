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
  idUser: string
  roomName: string
  avatarUser: string
}

export interface IResponseRooms {
  data: IDataRoom[]
  pagination: IPagination
}
export interface IParamsGetRooms {
  page: number
  limit: number
}
