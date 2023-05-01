import { StateCreator } from 'zustand'

import { ICommonState, IDataUser, IDataUserSignIn } from '@/interfaces'

export const commonSlice: StateCreator<ICommonState> = (set) => ({
  //user
  role: null,
  dataAccount: null,
  setDataAccount(data: IDataUser) {
    console.log(data)
    set(() => ({ role: data.role, dataAccount: data }))
  },

  // Modal
  messageModal: null,
  showModal: false,
  modalKey: null,
  onOk: undefined,
  onClose: undefined,
  setDataModal(data) {
    set(() => ({
      messageModal: data.messageModal,
      showModal: data.showModal,
      modalKey: data.modalKey,
      onOk: data.onOk,
      onClose: data.onClose,
    }))
  },
  closeModal() {
    set(() => ({
      messageModal: null,
      showModal: false,
      modalKey: null,
      onOk: undefined,
      onClose: undefined,
    }))
  },

  // App
  loading: null,
  setLoading(isLoad) {
    set(() => ({ loading: isLoad }))
  },
})
