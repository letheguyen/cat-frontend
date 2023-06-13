import clsx from 'clsx'
import io from 'socket.io-client'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'

import { useStore } from '@/store'
import { CloseIcon } from '@/icons'
import { ROLE_APP } from '@/constants'
import { UserMessenger } from '@/components'
import { IDataAccount, IDataRoom, IMessager, IPagination } from '@/interfaces'
import FormSendMessage from './formSendMessage'
import MessengerBody from './messengerBody'

const AdminSide: React.FC<IMessager> = () => {
  // Store
  const { allRoomAdmin, role, token, waitingLine, setWaitingLine, clearChat } =
    useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  // State
  const [page, setPage] = useState(1)
  const [dataPaginate, setDataPaginate] = useState<IPagination>()
  const [dataRooms, setDataRooms] = useState<IDataRoom[]>()
  const [accountTop, setAccountTop] = useState<IDataAccount>()
  const { query, pathname, push } = useRouter()

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
    if (query.userId && role === ROLE_APP.ADMIN && message) {
      const room = allRoomAdmin?.data?.find(
        (room) => room.userId === query.userId
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
    if (query.userId && allRoomAdmin?.data) {
      const accountTop = allRoomAdmin?.data.find(
        (acc) => acc.userId === query.userId
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

  useEffect(() => {
    if (!accountTop) return

    const newWaitingLine = waitingLine?.filter(
      (accId) => accId !== accountTop._id
    )

    console.log(newWaitingLine)

    if (newWaitingLine) setWaitingLine(newWaitingLine)
  }, [accountTop])

  console.log(waitingLine)

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
              onClick={() => push({ pathname, query: { userId: null } })}
              className={'opacity-70 p-3 hover:opacity-100 iconClose'}
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
        </Box>
        {accountTop && <FormSendMessage onSubmit={(value) => submit(value)} />}
      </Box>
    </>
  )
}

export default memo(AdminSide)
