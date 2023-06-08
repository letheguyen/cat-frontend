import clsx from 'clsx'
import io from 'socket.io-client'
import { Box } from '@chakra-ui/react'
import React, { memo, useEffect, useRef, useState } from 'react'

import { useStore } from '@/store'
import { CloseIcon, MessagerIcon } from '@/icons'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { useClickOutside } from '@/hooks'
import { UserMessenger, ButtonPrimary, LoadingItem } from '@/components'
import {
  IDataAccount,
  IDataRoom,
  IMessager,
  IPagination,
  IDataMessge,
  IAllRoomDetail,
} from '@/interfaces'
import { createChatRoom, getAllRoomAdmin, getDetailRoomChat } from '@/services'
import FormSendMessage from './formSendMessage'
import MessengerBody from './messengerBody'
import { useRouter } from 'next/router'
import UserSide from './userSide'

const AdminSide: React.FC<IMessager> = () => {
  const [dataRoomsAdmin, setDataRoomsAdmin] = useState<IAllRoomDetail>()

  // Store
  const {
    dataAccount,
    dataChat,
    dataShop,
    dataRoomUser,
    allRoomAdmin,
    role,
    usersOnline,
    token,
    setDataChat,
    clearChat,
    refetchRooms,
  } = useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

  // State
  const refMessenger = useRef(null)
  const [open, onOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAdminSend, setShowAdminSend] = useState(false)
  const [page, setPage] = useState(1)
  const [dataPaginate, setDataPaginate] = useState<IPagination>()
  const [dataRooms, setDataRooms] = useState<IDataRoom[]>()
  const [accountTop, setAccountTop] = useState<IDataAccount>()
  const { query, pathname, push } = useRouter()

  // Custom hook
  useClickOutside(refMessenger, () => onOpen(false))

  // Scroll buttom
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const bottom = scrollHeight - scrollTop === clientHeight

    if (
      bottom &&
      dataPaginate &&
      dataRooms &&
      role === ROLE_APP.ADMIN &&
      dataPaginate?.totalPage > dataRooms?.length
    ) {
      setPage(page + 1)
    }
  }

  // Submit
  const submit = (message: string) => {
    if (query.chatId && role === ROLE_APP.ADMIN && message) {
      const room = allRoomAdmin?.data?.find(
        (room) => room.userId === query.chatId
      )
      if (!room) return
      const messageSend = {
        idRoom: room?._id,
        from: room.seller,
        to: room?.userId,
        message: message.trim(),
        idUserCreate: room?.userId,
      }
      socket.emit('CHAT', messageSend)
    }
  }

  // Get account top
  const handleSetAccountTop = () => {
    clearChat()
    if (query.chatId && allRoomAdmin?.data) {
      const accountTop = allRoomAdmin?.data.find(
        (acc) => acc.userId === query.chatId
      )
      if (!accountTop) return
      setAccountTop({
        _id: accountTop.userId,
        avatar: accountTop.roomImage,
        userName: accountTop.name,
      })
    } else {
      setAccountTop(undefined)
    }
  }

  // -- Effect--
  useEffect(() => {
    handleSetAccountTop()
  }, [query])

  return (
    <>
      <Box className="h-12 w-full border-b border-b-colorPrimary/30 flexItem transition-all ease-in">
        {accountTop ? (
          <>
            <UserMessenger
              className="hover:bg-transparent"
              dataAccount={accountTop}
            />

            <CloseIcon
              width="40"
              height="40"
              onClick={() => push({ pathname, query: { chatId: null } })}
              className={'opacity-70 p-1 hover:opacity-100 iconClose'}
            />
          </>
        ) : (
          <Box className="-mt-1.5 w-full text-center">Message List</Box>
        )}
      </Box>

      <Box className="h-full w-full relative">
        <Box
          onScroll={handleScroll}
          className={clsx(
            'mt-4 flex flex-col max-h-contentMessenger overflow-auto h-screen mb-2'
          )}
        >
          {accountTop ? (
            <MessengerBody />
          ) : (
            allRoomAdmin?.data?.map((room, i) => (
              <UserMessenger
                isChild
                key={room._id + i}
                className="py-1 mb-1 transition-all ease-linear"
                dataAccount={{
                  _id: room.userId,
                  avatar: room.roomImage,
                  userName: room.name,
                }}
              />
            ))
          )}

          {loading && (
            <Box className="absolute top-0 left-0 w-full h-screen max-h-contentMessenger flexItem-center bg-black/10">
              <LoadingItem width="30px" height="30px" className="m-auto z-40" />
            </Box>
          )}
        </Box>
        {accountTop && <FormSendMessage onSubmit={(value) => submit(value)} />}
      </Box>
    </>
  )
}

export default memo(AdminSide)
