import { useStore } from '@/store'
import Image from 'next/image'
import React from 'react'

import errorImage from '/public/imageError.gif'
import RootModal from './rootModal'
import { Text } from '@chakra-ui/react'

const ModalError = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="350px" height="310px">
      <div>
        <Text
          as="h3"
          fontSize="headingTitle"
          className="block font-semibold text-primaryColor capitalize text-center drop-shadow-lg shadow-black"
        >
          {messageModal}
        </Text>

        <Image
          width={100}
          src={errorImage}
          alt="Image Error"
          className="m-auto mt-10"
        />
      </div>
    </RootModal>
  )
}

export default ModalError
