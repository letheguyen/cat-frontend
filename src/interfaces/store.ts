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
  onOk?: () => void
  showModal?: boolean
  onClose?: () => void
  closeModal: () => void
  modalKey: modalType | null
  messageModal: null | string
  setDataModal: (data: IModalType) => void

  // App
  loading: null | boolean
  setLoading: (isLoad: null | boolean) => void
}
