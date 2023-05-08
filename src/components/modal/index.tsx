import React, { memo } from 'react'

import { useStore } from '@/store'
import ModalError from './modalError'
import { MODAL_TYPE } from '@/constants'
import ModalSuccess from './modalSuccess'
import ModalConfirm from './modalConfirm'


export const RootModal = memo(() => {
  const { modalKey } = useStore()

  const MODAL = {
    [MODAL_TYPE.commonError]: <ModalError />,
    [MODAL_TYPE.commonSuccess]: <ModalSuccess />,
    [MODAL_TYPE.commonConfirm]: <ModalConfirm />,
  }

  return <>{modalKey && MODAL[modalKey]}</>
})
