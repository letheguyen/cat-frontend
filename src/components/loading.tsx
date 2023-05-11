import Image from 'next/image' 
import React, { memo } from 'react'

import { ILoadingModal } from '@/interfaces'
import loadingImage from '/public/loadingImg.gif'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

const Loading: React.FC<ILoadingModal> = ({ loading }) => {
  return (
    <Modal onClose={() => {}} isOpen={loading} isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" border='none' shadow="none" w="auto">
        <ModalBody>
          <Image width={140} src={loadingImage} alt="image loading" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(Loading)
