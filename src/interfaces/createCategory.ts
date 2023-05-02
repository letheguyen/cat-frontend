export interface TypeFormCreateCategory {
  title: string
  description: string
  avatar?: FileList
  background?: FileList
  attribute?: {
    key: string
    value: string
  }[]
}


export interface IDataCreateCategory {
  title: string
  description: string
  avatar: FileList
  background: FileList
  attribute: {
    key: string
    value: string
  }[] | []
}

export interface IDataPostCreateCategory {
  title: string
  description: string
  avatar: string
  background: string
  attribute: {
    key: string
    value: string
  }[] | []
}