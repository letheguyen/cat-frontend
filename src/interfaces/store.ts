import { IDataUserSign } from './signIn'

export interface ICommonState {
  role: null | string
  dataAccount: null | IDataUserSign
  setDataAccount: (data: IDataUserSign) => void
}
