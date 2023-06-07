import clsx from 'clsx'
import { Box } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'

import { useStore } from '@/store'
import { COUNT_MESSAGE } from '@/constants'
import MessengerBody from './messengerBody'
import UserMessenger from './userMessenger'
import FormSendMessage from './formSendMessage'
import { ButtonPrimary, LoadingItem } from '@/components'
import { createChatRoom, getDetailRoomChat } from '@/services'
import { IPagination } from '@/interfaces'
import { io } from 'socket.io-client'

const UserSide = () => {
  // State
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [dataPaginate, setDataPaginate] = useState<IPagination>()

  // Store
  const {
    dataAccount,
    dataChat,
    dataShop,
    dataRoomUser,
    role,
    usersOnline,
    token,
    setDataChat,
    refetchRooms,
  } = useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    extraHeaders: {
      Authorization: token ? (token as string) : '',
    },
  })

  // Create rooms
  const createRoomChat = async () => {
    if (dataAccount) {
      const res = await createChatRoom(dataAccount._id)
      if (res) refetchRooms(true)
    }
  }

  // Send message
  const onSubmit = (message: string) => {
    const messageSend = {
      idRoom: dataRoomUser?._id,
      from: dataAccount?._id,
      to: dataShop?._id,
      message: message,
      idUserCreate: dataAccount?._id,
    }
    socket.emit('CHAT', messageSend)
  }

  // Get message
  const getMessage = async () => {
    if (dataRoomUser && page) {
      if (dataPaginate && dataPaginate.totalPage < page) return
      const newData = await getDetailRoomChat(
        { page, limit: 10 },
        dataRoomUser._id
      )
      if (dataChat && page === 1) return
      if (newData) {
        setDataChat(newData.data, true)
        setDataPaginate(newData.pagination)
      }
    }
  }

  // Effect
  useEffect(() => {
    getMessage()
  }, [dataRoomUser, page])

  return (
    <>
      <Box className="h-12 w-full border-b border-b-colorPrimary/30 flexItem">
        {dataShop && (
          <UserMessenger
            className="hover:bg-transparent"
            dataAccount={{
              _id: dataShop._id,
              avatar: dataShop.avatar,
              userName: dataShop.name,
            }}
          />
        )}
      </Box>

      <Box
        className={clsx(
          dataRoomUser ? 'h-full w-full relative' : 'flexItem-center'
        )}
      >
        {!dataRoomUser && (
          <ButtonPrimary
            className="!rounded-md mt-6"
            type="submit"
            title="Chat with seller"
            onClick={() => createRoomChat()}
          />
        )}

        <Box
          className={clsx(
            'mt-4 flex flex-col max-h-contentMessenger overflow-hidden h-screen mb-2'
          )}
        >
          {loading && (
            <Box className="absolute top-0 left-0 w-full h-screen max-h-contentMessenger flexItem-center bg-black/10">
              <LoadingItem width="30px" height="30px" className="m-auto z-40" />
            </Box>
          )}

          <MessengerBody
            isSearch={page === 1}
            getChat={() => setPage((state) => state + 1)}
          />
        </Box>

        {dataRoomUser && <FormSendMessage onSubmit={onSubmit} />}
      </Box>
    </>
  )
}

export default memo(UserSide)
