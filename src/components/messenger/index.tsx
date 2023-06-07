import clsx from 'clsx'
import { Box } from '@chakra-ui/react'
import React, { memo, useRef, useState } from 'react'

import { useStore } from '@/store'
import { MessagerIcon } from '@/icons'
import { ROLE_APP } from '@/constants'
import { useClickOutside } from '@/hooks'

import UserSide from './userSide'
import AdminSide from './adminSide'

const Messenger = () => {
  // Store
  const { role } = useStore()

  // State
  const refMessenger = useRef(null)
  const [open, onOpen] = useState(false)

  // Custom hook
  useClickOutside(refMessenger, () => onOpen(false))

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
            'absolute right-0 transition-all ease-linear',
            open
              ? 'top-10 w-96 bg-white border border-borderItemColor shadow-lg'
              : 'top-0 w-0 h-0'
          )}
        >
          {open && (
            <Box className="text-black h-full w-full p-3">
              {role === ROLE_APP.USER && <UserSide />}
              {role === ROLE_APP.ADMIN && <AdminSide />}
            </Box>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Messenger)
