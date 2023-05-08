import { useStore } from '@/store'
import Image from 'next/image'
import React from 'react'

import successImage from '/public/success.png'
import RootModal from './rootModal'
import { Text } from '@chakra-ui/react'

const ModalSuccess = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="340px" height="280px" noIconClose noButtonFooter>
      <div>
        <Text fontSize='headingTitle' className="block font-semibold text-primaryColor capitalize text-center drop-shadow-lg shadow-black">
          {messageModal}
        </Text>

        <Image
          width={100}
          src={successImage}
          alt="Image success"
          className="animate-bounce m-auto mt-10"
        />
      </div>
    </RootModal>
  )
}

export default ModalSuccess
