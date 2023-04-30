import { useStore } from '@/store'
import Image from 'next/image'
import React from 'react'

import successImage from '/public/success.png'
import RootModal from './rootModal'

const ModalSuccess = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="340px" height="220px" noIconClose noButtonFooter>
      <div>
        <h3 className="text-[28px] block font-semibold text-[var(--primary-color)] capitalize text-center drop-shadow-lg shadow-black">
          {messageModal}
        </h3>

        <Image
          className="animate-bounce m-auto mt-10"
          width={100}
          src={successImage}
          alt="Image success"
        />
      </div>
    </RootModal>
  )
}

export default ModalSuccess
