import clsx from 'clsx'
import io from 'socket.io-client'
import { Box } from '@chakra-ui/react'
import React, { memo, useEffect, useRef, useState } from 'react'

import { useStore } from '@/store'
import { MessagerIcon } from '@/icons'
import { ROLE_APP } from '@/constants'
import { useClickOutside } from '@/hooks'
import { ButtonPrimary } from './buttonPrimary'
import UserMessenger from './userMessenger'
import { IDataAccount, IMessager } from '@/interfaces'

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

const Messenger: React.FC<IMessager> = () => {
  // Store
  const { dataAccount, dataChat, dataShop, role, usersOnline } = useStore()

  // State
  const refMessenger = useRef(null)
  const [open, onOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [accountTop, setAccountTop] = useState<IDataAccount>()

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
    if (open) socket.emit('ACOUNT_ONELINE', dataAccount?._id)
  }, [open])

  useEffect(() => {
    if (!dataShop) return
    setAccountTop({
      _id: dataShop._id,
      userName: dataShop?.name,
      avatar: dataShop.avatar,
    })
  }, [dataShop])

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
          className={clsx(
            'absolute right-0  max-h-messenger transition-all ease-linear',
            open
              ? 'top-10 w-96 h-screen bg-white border border-borderItemColor shadow-lg'
              : 'top-0 w-0 h-0 bg-transparent border-none'
          )}
        >
          {open && (
            <Box className="text-black h-full w-full px-3">
              <Box className="h-12 border-b border-b-colorPrimary/30 flexItem">
                {accountTop && <UserMessenger dataAccount={accountTop} />}
              </Box>
              <Box className={clsx('h-full w-full', 'flexItem-center')}>
                {role !== ROLE_APP.ADMIN && (
                  <ButtonPrimary
                    className="!rounded-md mt-6"
                    type="submit"
                    title="Chat with seller"
                  />
                )}
              </Box>
            </Box>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Messenger)
