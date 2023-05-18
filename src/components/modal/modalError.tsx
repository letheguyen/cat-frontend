import React from 'react'
import Image from 'next/image'
import { Text } from '@chakra-ui/react'

import { useStore } from '@/store'
import RootModal from './rootModal'
import errorImage from '/public/imageError.gif'

const ModalError = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="350px" height="">
      <div>
        <Text
          as="span"
          lineHeight="30px"
          fontSize="headingTitle"
          className="heading-modal"
        >
          <Text as="span" className="uppercase">
            {messageModal?.slice(0, 1)}
          </Text>
          {String(messageModal)?.slice(1)}
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
