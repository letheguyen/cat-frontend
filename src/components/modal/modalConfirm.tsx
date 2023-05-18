import React from 'react'
import Image from 'next/image'
import { useStore } from '@/store'

import RootModal from './rootModal'
import { Text, Box } from '@chakra-ui/react'
import imageConfirm from '/public/imageConfirm.gif'

const ModalError = () => {
  const { messageModal } = useStore()

  return (
    <RootModal
      width="350px"
      height="280px"
      textBtnClose="No"
      textBtnAccept="Yes"
    >
      <Box>
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
          alt="Image Error"
          src={imageConfirm}
          className="m-auto mt-6"
        />
      </Box>
    </RootModal>
  )
}

export default ModalError
