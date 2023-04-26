export interface TypeFormSignUp {
  userName: string,
  email: string,
  password: string,
  age: number,
  address?: string,
  avatar?: FileList,
  background?: FileList,
}

export interface DataPostSignUp {
  userName: string,
  email: string,
  password: string,
  age: number,
  address?: string,
  avatar?: File,
  background?: File,
}