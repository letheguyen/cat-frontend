import { MODAL_TYPE } from '@/constants'
import { IDataUserSign } from './signIn'
import { ValueOf } from './common'
import { IModalType } from './modal'

export type modalType = ValueOf<typeof MODAL_TYPE>

export interface ICommonState {
  // user
  role: null | string
  dataAccount: null | IDataUserSign
  setDataAccount: (data: IDataUserSign) => void

  // Modal
  messageModal: null | string
  showModal: boolean,
  modalKey: modalType | null,
  onOk?: () => void,
  onClose?: () => void,
  setDataModal: (data: IModalType) => void
  closeModal: () => void

}
  