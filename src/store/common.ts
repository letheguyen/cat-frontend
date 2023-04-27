import { StateCreator } from 'zustand'

import { ICommonState, IDataUserSign } from '@/interfaces'

export const commonSlice: StateCreator<ICommonState> = (set) => ({
  role: null,
  dataAccount: null,
  setDataAccount(data: IDataUserSign) {
    set(() => ({ role: data.role, dataAccount: data }))
  },
})
