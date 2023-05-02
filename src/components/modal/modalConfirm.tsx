import { useStore } from '@/store'
import Image from 'next/image'
import React from 'react'

import imageConfirm from '/public/imageConfirm.gif'
import RootModal from './rootModal'

const ModalError = () => {
  const { messageModal } = useStore()

  return (
    <RootModal textBtnAccept='Yes' textBtnClose='No' width="350px" height="280px">
      <div>
        <h3 className="text-[28px] block font-semibold text-[var(--primary-color)] capitalize text-center drop-shadow-lg shadow-black">
          {messageModal}
        </h3>

        <Image
          className="m-auto mt-10"
          width={100}
          src={imageConfirm}
          alt="Image Error"
        />
      </div>
    </RootModal>
  )
}

export default ModalError
