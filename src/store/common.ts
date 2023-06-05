import { StateCreator } from 'zustand'

import { ICommonState, IDataUser } from '@/interfaces'

export const commonSlice: StateCreator<ICommonState> = (set, get) => ({
  //user
  role: null,
  token: null,
  dataAccount: null,
  setDataAccount(data: IDataUser, token) {
    set(() => ({ role: data.role, dataAccount: data, token: token }))
  },

  // Modal
  modalKey: null,
  onOk: undefined,
  showModal: false,
  messageModal: null,
  onClose: undefined,
  setDataModal(data) {
    set(() => ({
      showModal: true,
      onOk: data.onOk,
      onClose: data.onClose,
      modalKey: data.modalKey,
      messageModal: data.messageModal,
    }))
  },
  closeModal() {
    set(() => ({
      modalKey: null,
      onOk: undefined,
      showModal: false,
      messageModal: null,
      onClose: undefined,
    }))
  },

  // App
  loading: null,
  setLoading(isLoad) {
    set(() => ({ loading: isLoad }))
  },

  // Chat
  dataChat: null,
  usersOnline: [],
  setDataChat(data) {
    const oldChat = get().dataChat
    set(() => ({ dataChat: oldChat ? [...oldChat, data] : [data] }))
  },
  setDataUserOnline(data) {
    const oldAccountOnline = get().usersOnline
    if (oldAccountOnline.includes(data)) return
    set(() => ({
      usersOnline: oldAccountOnline ? [...oldAccountOnline, data] : [data],
    }))
  },

  // Shop info
  dataShop: null,
  setDataShopInfo(data) {
    set(() => ({ dataShop: data }))
  },
})
