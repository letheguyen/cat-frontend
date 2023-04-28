import React, { memo } from 'react'
import { useStore } from '@/store'
import { IModal } from '@/interfaces'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { ButtonPrimary } from '../ButtonPrimary'
import { CloseIcon } from '@/icons'

const RootModal: React.FC<IModal> = ({
  className = '',
  width = '400px',
  height = '300px',
  noButtonFooter = false,
  noIconClose = false,
  children,
  textBtnAccept = 'Ok',
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
    <Modal onClose={closeModal} isOpen={showModal} isCentered>
      <ModalOverlay />
      <ModalContent
        className="flex flex-col items-center justify-center"
        width={width}
        height={height}
      >
        {!noIconClose && (
          <CloseIcon
            onClick={closeModal}
            color="var(--primary-color)"
            width="35"
            height="35"
            className="ml-auto p-1 mr-2 transition-all ease-in drop-shadow-lg shadow-black hover:cursor-pointer hover:rotate-2 hover:scale-125 z-50"
          />
        )}

        <div className="-mt-3">
          <ModalBody className={className}>{children}</ModalBody>
        </div>

        {!noButtonFooter && (
          <ModalFooter gap={4} className="flex !justify-center !items-center">
            <ButtonPrimary
              onClick={handleOk}
              type="button"
              title={textBtnAccept}
              className="!rounded-lg w-24 capitalize"
            />

            <ButtonPrimary
              onClick={handleClose}
              type="button"
              title={textBtnClose}
              className="!rounded-lg w-24 capitalize"
              buttonType="close"
            />
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default memo(RootModal)
