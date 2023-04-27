import clsx from 'clsx'
import React, { memo } from 'react'

import { useStore } from '@/store'
import { MODAL_TYPE } from '@/constants'
import ModalError from './modalError'
import { IModal } from '@/interfaces'
import { CloseIcon } from '@/icons'

export const RootModal: React.FC<IModal> = memo(
  ({ className = '', width = '400px', height = '300px', noButton = false }) => {
    const { modalKey, showModal, closeModal } = useStore()

    const MODAL = {
      [MODAL_TYPE.commonError]: <ModalError />,
    }

    const style = {
      width: width,
      height: height,
    }

    return (
      <div
        className={clsx(
          showModal
            ? 'opacity-100 flex scale-100'
            : 'hidden opacity-0 scale-50',
          'fixed w-full h-full top-0 left-0 z-40 bg-black/50 justify-center items-center transition-all ease-in duration-300 overflow-y-auto overflow-x-hidden'
        )}
      >
        <div
          style={style}
          className={clsx(
            'bg-[var(--bg-modal)] shadow-xl rounded-lg z-50 pb-4 px-4',
            className
          )}
        >
          <CloseIcon
            onClick={closeModal}
            color="var(--primary-color)"
            width="35"
            height="35"
            className="ml-auto mt-3 p-1 transition-all ease-in drop-shadow-lg shadow-black hover:cursor-pointer hover:rotate-2 hover:scale-125 z-50"
          />
          {modalKey && MODAL[modalKey]}
        </div>
      </div>
    )
  }
)
