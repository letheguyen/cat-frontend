import React from 'react'
import Image from 'next/image'
import { Box, Text } from '@chakra-ui/react'

import { useStore } from '@/store'
import RootModal from './rootModal'
import successImage from '/public/success.png'

const ModalSuccess = () => {
  const { messageModal } = useStore()

  return (
    <RootModal width="340px" height="240px" noIconClose noButtonFooter>
      <Box className="h-full">
        <Text
          as="span"
          lineHeight="24px"
          fontSize="headingTitle"
          className="heading-modal"
        >
          <Text as="span" className="uppercase">
            {messageModal?.slice(0, 1)}
          </Text>
          {String(messageModal)?.slice(1)}
        </Text>

        <Image
          width={90}
          src={successImage}
          alt="Image success"
          className="animate-bounce m-auto mt-14"
        />
      </Box>
    </RootModal>
  )
}

export default ModalSuccess
