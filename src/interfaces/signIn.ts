export interface IDataUserSignIn {
  data: IDataUser
  token: string
}

export interface ISignInData {
  email: string
  password: string
}

export interface IDataUser {
  addressDetail: string | undefined
  age: number
  avatar: string | undefined
  background: string | undefined
  districts: string | undefined
  email: string
  phone: string
  provinces: string | undefined
  role: string
  userName: string
  wards: string | undefined
  _id: string
}
