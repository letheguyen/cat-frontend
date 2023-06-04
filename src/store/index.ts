import { create } from 'zustand'

import { commonSlice } from './common'
import { chatSlice } from './chat'
import { IChatSlice, ICommonState } from '@/interfaces'

export const useStore = create<ICommonState & IChatSlice>()((...a) => ({
  ...commonSlice(...a),
  ...chatSlice(...a)
}))
