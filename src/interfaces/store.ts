import { MODAL_TYPE } from '@/constants'
import { IDataUser } from './signIn'
import { ValueOf } from './common'
import { IModalType } from './modal'
import {
  IAllRoomDetail,
  IChatContent,
  IDataAccount,
  IDataMessge,
  IRoomDetail,
} from './messenger'
import { IDataShopInforStore, IDataShopInformation } from './shopInformation'

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

  // Chat
  usersOnline: string[]
  dataChat: IDataMessge[] | null
  fetchRooms: null | boolean
  dataRoomUser: null | IRoomDetail
  allRoomAdmin: null | IAllRoomDetail
  queueMessage: null | string[]
  setQueueMessage: (data: string[] | null) => void
  setDataChat: (data: IDataMessge[], isAddTop?: boolean) => void
  setDataUserOnline: (data: string[]) => void
  clearChat: () => void
  refetchRooms: (fetch: boolean | null) => void
  setRoomUser: (data: IRoomDetail | null) => void
  setRoomAdmin: (data: IAllRoomDetail | null) => void

  // Shop info
  dataShop: null | IDataShopInforStore
  setDataShopInfo: (data: IDataShopInforStore) => void
}
