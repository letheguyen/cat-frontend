import { create } from 'zustand'

import { commonSlice } from './common'
import { ICommonState } from '@/interfaces'

export const useStore = create<ICommonState>()((...a) => ({
  ...commonSlice(...a),
}))
