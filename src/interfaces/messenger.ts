export interface IMessager {
  width?: string
  height?: string
  className?: string
}

export interface IChatContent {
  content: string,
  idUser: string,
  image?: string | null,
  avatar?: string
}

export interface IChatSlice {
  dataChat: IChatContent[] | null,
  setDataChat: (data: IChatContent) => void
}