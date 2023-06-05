import { IAtrributes } from './category'
import { IDataAccount } from './messenger'

export interface IDataUserSignIn {
  token: string
  data: IDataUser
}
export interface ISignInData {
  email: string
  password: string
}
export interface ISignInSNSData {
  userName: string | null
  avatar: string | null
  email: string | null
  phone: string | null
  age: number
  uid: string
}
export interface IDataUser {
  age: number
  _id: string
  role: string
  email: string
  phone: string
  userName: string
  wards: string | undefined
  avatar: string | undefined
  provinces: string | undefined
  districts: string | undefined
  background: string | undefined
  addressDetail: string | undefined
}
export interface IDataAccountTop {
  dataAccount: IDataAccount
}
