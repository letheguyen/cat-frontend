import clsx from 'clsx'
import io from 'socket.io-client'
import React, { memo, useEffect, useRef, useState } from 'react'

import { IMessager } from '@/interfaces'
import { MessagerIcon } from '@/icons'
import { useClickOutside } from '@/hooks'
import { useStore } from '@/store'
import { Box } from '@chakra-ui/react'
import { ButtonPrimary } from './buttonPrimary'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

const Messenger: React.FC<IMessager> = () => {
  const refMessenger = useRef(null)
  const [open, onOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Store
  const { dataAccount, dataChat } = useStore()

  // Custom hook
  useClickOutside(refMessenger, () => onOpen(false))

  const submit = () => {
    socket.emit('CHAT', {
      content: message,
      avatar: dataAccount?.avatar,
      idUser: dataAccount?._id,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    const timmerId = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      if (!open) clearTimeout(timmerId)
    }
  }, [open])

  return (
    <div>
      <div className="relative" ref={refMessenger}>
        <div
          onClick={() => onOpen(!open)}
          className="text-black w-10 h-10 flexItem-center cursor-pointer relative opacity-80 hover:text-colorPrimary hover:opacity-100"
        >
          <MessagerIcon width="32" height="32" />
          <span className="absolute flex h-3 w-3 top-1 right-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-colorActiveMessage opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-colorActiveMessage"></span>
          </span>
        </div>

        <div
          onClick={() => submit()}
          className={clsx(
            'absolute right-0  max-h-messenger transition-all ease-linear',
            open
              ? 'top-10 w-96 h-screen bg-white border border-borderItemColor shadow-lg'
              : 'top-0 w-0 h-0 bg-transparent border-none'
          )}
        >
          {isLoading && open
            ? 'Loading...'
            : open && (
                <Box className="text-black h-full w-full">
                  Data messenger
                  <Box className={clsx('h-full w-full', 'flexItem-center')}>
                    <ButtonPrimary
                      className="!rounded-md mt-6"
                      type="submit"
                      title="Chat with seller"
                    />
                  </Box>
                </Box>
              )}
        </div>
      </div>
    </div>
  )
}

export default memo(Messenger)
