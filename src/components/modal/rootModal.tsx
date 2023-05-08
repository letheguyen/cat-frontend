import React, { memo } from 'react'
import { useStore } from '@/store'
import { IModal } from '@/interfaces'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Box,
} from '@chakra-ui/react'
import { ButtonPrimary } from '../buttonPrimary'
import { CloseIcon } from '@/icons'

const RootModal: React.FC<IModal> = ({
  children,
  className = '',
  width = '400px',
  height = '300px',
  noIconClose = false,
  textBtnAccept = 'Ok',
  noButtonFooter = false,
  textBtnClose = 'Close',
}) => {
  // Store
  const { showModal, closeModal, onClose, onOk } = useStore()

  // Modal handle ok
  const handleOk = () => {
    if (onOk) {
      onOk()
    } else {
      closeModal()
    }
  }

  // Modal handle close
  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      closeModal()
    }
  }

  return (
    <Modal onClose={closeModal} isOpen={!!showModal} isCentered>
      <ModalOverlay />
      <ModalContent
        width={width}
        height={height}
        className="flex-col flexItem-center"
      >
        {!noIconClose && (
          <CloseIcon
            width="30"
            height="30"
            onClick={closeModal}
            className="ml-auto text-primaryColor p-1 mr-2 opacity-60 transition-all ease-in drop-shadow-lg shadow-black hover:opacity-100 hover:cursor-pointer hover:rotate-2 hover:scale-125 z-50"
          />
        )}

        <Box className="-mt-3">
          <ModalBody className={className}>{children}</ModalBody>
        </Box>

        {!noButtonFooter && (
          <ModalFooter
            gap={4}
            className="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ButtonPrimary
              type="button"
              onClick={handleOk}
              title={textBtnAccept}
              className="!rounded-lg w-24 capitalize"
            />

            <ButtonPrimary
              type="button"
              buttonType="close"
              title={textBtnClose}
              onClick={handleClose}
              className="!rounded-lg w-24 capitalize"
            />
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default memo(RootModal)
