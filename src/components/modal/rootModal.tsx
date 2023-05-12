import React, { memo } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Box,
} from '@chakra-ui/react'

import { useStore } from '@/store'
import { CloseIcon } from '@/icons'
import { IModal } from '@/interfaces'
import { ButtonPrimary } from '@/components'

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
      <ModalContent width={width} height={height}>
        {!noIconClose && (
          <Box className="relative h-10">
            <CloseIcon
              width="30"
              height="30"
              onClick={closeModal}
              className="icon-close-modal z-50"
            />
          </Box>
        )}

        <Box className="m-auto flex-col flexItem-center">
          <ModalBody className={className}>{children}</ModalBody>
        </Box>

        {!noButtonFooter && (
          <ModalFooter className="mt-auto w-full">
            <Box className="flexItem-center gap-3 m-auto">
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
            </Box>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default memo(RootModal)
