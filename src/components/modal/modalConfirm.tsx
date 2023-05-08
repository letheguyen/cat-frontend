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
          as="h3"
          fontSize="headingTitle"
          className="block font-semibold text-primaryColor capitalize text-center drop-shadow-lg shadow-black"
        >
          {messageModal}
        </Text>

        <Image
          width={100}
          alt="Image Error"
          src={imageConfirm}
          className="m-auto mt-10"
        />
      </Box>
    </RootModal>
  )
}

export default ModalError
