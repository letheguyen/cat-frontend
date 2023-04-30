import React, { memo } from 'react'
import { ILoadingModal } from '@/interfaces'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import loadingImage from '/public/loadingImg.gif'
import Image from 'next/image'

const Loading: React.FC<ILoadingModal> = ({ loading }) => {
  return (
    <Modal onClose={() => console.log('')} isOpen={loading} isCentered>
      <ModalOverlay />
      <ModalContent className='!bg-transparent !shadow-none !w-auto'>
        <ModalBody>
          <Image width={140} src={loadingImage} alt="Image loading" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(Loading)
