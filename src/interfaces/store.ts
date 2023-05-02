import { MODAL_TYPE } from '@/constants'
import { IDataUser, IDataUserSignIn } from './signIn'
import { ValueOf } from './common'
import { IModalType } from './modal'

export type modalType = ValueOf<typeof MODAL_TYPE>

export interface ICommonState {
  // user
  role: null | string
  token: null | string
  dataAccount: null | IDataUser
  setDataAccount: (data: IDataUser, token: string) => void

  // Modal
  messageModal: null | string
  showModal: boolean
  modalKey: modalType | null
  onOk?: () => void
  onClose?: () => void
  setDataModal: (data: IModalType) => void
  closeModal: () => void

  // App
  loading: null | boolean
  setLoading: (isLoad: null | boolean) => void
}
