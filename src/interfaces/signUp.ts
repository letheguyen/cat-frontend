export interface TypeFormSignUp {
  userName: string
  email: string
  password: string
  phone: number
  age: number
  provinces?: string
  districts?: string
  wards?: string
  addressDetail?: string
  avatar?: FileList
  background?: FileList
}

export interface DataPostSignUp {
  userName: string
  email: string
  password: string
  phone: number
  age: number
  provinces?: string
  districts?: string
  wards?: string
  addressDetail?: string
  avatar?: string
  background?: string
}
