import { useStore } from '@/store'
import React from 'react'

const ModalError = () => {
  const { closeModal, messageModal } = useStore()

  return (
    <div className="">
      <h3 className="text-2xl block text-center drop-shadow-lg shadow-black">
        {messageModal}
      </h3>
    </div>
  )
}

export default ModalError
