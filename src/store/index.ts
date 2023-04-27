import { create } from 'zustand'

import { ICommonState } from '@/interfaces'
import { commonSlice } from './common'

export const useStore = create<ICommonState>()((...a) => ({
  ...commonSlice(...a),
}))
