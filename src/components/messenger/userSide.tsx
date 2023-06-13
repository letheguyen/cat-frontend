import clsx from 'clsx'
import React, { memo } from 'react'
import { io } from 'socket.io-client'
import { Box } from '@chakra-ui/react'

import { useStore } from '@/store'
import MessengerBody from './messengerBody'
import UserMessenger from './userMessenger'
import FormSendMessage from './formSendMessage'
import { ButtonPrimary } from '@/components'
import { createChatRoom } from '@/services'

const UserSide = () => {
  // Store
  const { dataAccount, token, dataShop, dataRoomUser, refetchRooms } =
    useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
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
      to: dataRoomUser?.seller,
      message: message,
      idUserCreate: dataAccount?._id,
    }
    socket.emit('CHAT', messageSend)
  }

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
        {dataRoomUser ? (
          <>
            <Box className="mt-4 flex flex-col max-h-contentMessenger overflow-hidden h-screen mb-2">
              <MessengerBody />
            </Box>
            <FormSendMessage onSubmit={onSubmit} />
          </>
        ) : (
          <ButtonPrimary
            className="!rounded-md mt-6"
            type="submit"
            title="Chat with seller"
            onClick={() => createRoomChat()}
          />
        )}
      </Box>
    </>
  )
}

export default memo(UserSide)
