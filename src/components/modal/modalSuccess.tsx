import React from 'react'
import Image from 'next/image'
import { Text } from '@chakra-ui/react'

import { useStore } from '@/store'
import RootModal from './rootModal'
import successImage from '/public/success.png'

const ModalSuccess = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="340px" height="280px" noIconClose noButtonFooter>
      <div>
        <Text
          as="span"
          lineHeight="30px"
          fontSize="headingTitle"
          className="heading-modal"
        >
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
