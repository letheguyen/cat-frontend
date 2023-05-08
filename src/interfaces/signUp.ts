export interface TypeFormSignUp {
  age: number
  phone: number
  email: string
  wards?: string
  userName: string
  password: string
  avatar?: FileList
  provinces?: string
  districts?: string
  background?: FileList
  addressDetail?: string
}
export interface DataPostSignUp {
  age: number
  phone: number
  email: string
  wards?: string
  avatar?: string
  password: string
  userName: string
  provinces?: string
  districts?: string
  background?: string
  addressDetail?: string
}
