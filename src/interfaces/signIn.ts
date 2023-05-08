export interface IDataUserSignIn {
  token: string
  data: IDataUser
}
export interface ISignInData {
  email: string
  password: string
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
