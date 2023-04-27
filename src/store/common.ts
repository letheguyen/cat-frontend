import { StateCreator } from 'zustand'

import { ICommonState, IDataUserSign } from '@/interfaces'

export const commonSlice: StateCreator<ICommonState> = (set) => ({
  //user
  role: null,
  dataAccount: null,
  setDataAccount(data: IDataUserSign) {
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
})
