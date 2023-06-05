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
