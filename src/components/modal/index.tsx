import React, { memo } from 'react'

import { useStore } from '@/store'
import { MODAL_TYPE } from '@/constants'
import ModalError from './modalError'

export const RootModal = memo(() => {
  const { modalKey } = useStore()

  const MODAL = {
    [MODAL_TYPE.commonError]: <ModalError />,
  }

  return <>{modalKey && MODAL[modalKey]}</>
})
