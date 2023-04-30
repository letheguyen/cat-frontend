import React, { memo } from 'react'

import { useStore } from '@/store'
import { MODAL_TYPE } from '@/constants'
import ModalError from './modalError'
import ModalSuccess from './modalSuccess'

export const RootModal = memo(() => {
  const { modalKey } = useStore()

  const MODAL = {
    [MODAL_TYPE.commonError]: <ModalError />,
    [MODAL_TYPE.commonSuccess]: <ModalSuccess />,
  }

  return <>{modalKey && MODAL[modalKey]}</>
})
