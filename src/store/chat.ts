import { StateCreator } from 'zustand'

import { IChatSlice } from '@/interfaces'

export const chatSlice: StateCreator<IChatSlice> = (set, get) => ({
  dataChat: null,
  setDataChat(data) {
    const oldChat = get().dataChat
    set(() => ({ dataChat: oldChat ? [...oldChat, data] : [data] }))
  },
})
