import { StateCreator } from 'zustand'

import { ICommonState, IDataUser } from '@/interfaces'

export const commonSlice: StateCreator<ICommonState> = (set) => ({
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
})
