import clsx from 'clsx'
import io from 'socket.io-client'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useMemo, useState } from 'react'

import { useStore } from '@/store'
import { CloseIcon } from '@/icons'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import MessengerBody from './messengerBody'
import { UserMessenger } from '@/components'
import FormSendMessage from './formSendMessage'
import {
  IAllRoomDetail,
  IDataAccount,
  IDataRoom,
  IMessager,
  IPagination,
} from '@/interfaces'
import { getAllRooms } from '@/services'

const AdminSide: React.FC<IMessager> = () => {
  // Store
  const { allRoomAdmin, role, token, waitingLine, clearChat, setRoomAdmin } =
    useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  // State
  const [page, setPage] = useState(1)
  const [accountTop, setAccountTop] = useState<IDataAccount>()
  const { query, pathname, push } = useRouter()

  // Scroll buttom
  const handleScroll = (e: any) => {
    if (!allRoomAdmin) return
    const { pagination } = allRoomAdmin
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const bottom = scrollHeight - scrollTop === clientHeight

    if (bottom && role === ROLE_APP.ADMIN && page <= pagination.totalPage) {
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

  // Get room admin
  const getNewRoomAdmin = async () => {
    if (allRoomAdmin) {
      const { data } = allRoomAdmin
      const newRooms: IAllRoomDetail | null = await getAllRooms({
        page: page,
        limit: LIMIT_ROOMS,
      })

      if (newRooms) {
        setRoomAdmin({ ...newRooms, data: [...data, ...newRooms.data] })
      }
    }
  }

  // Data acc
  const dataAcc = useMemo(() => {
    const dataWaiting =
      allRoomAdmin?.data
        ?.filter((room) => waitingLine?.includes(room.userId))
        .map((room) => ({ ...room, waiting: true })) || []

    const dataRoom =
      allRoomAdmin?.data
        ?.filter((room) => !waitingLine?.includes(room.userId))
        .map((room) => ({ ...room, waiting: false })) || []

    return [...dataWaiting, ...dataRoom]
  }, [waitingLine, allRoomAdmin])

  // Effect
  useEffect(() => {
    handleSetAccountTop()
  }, [query])

  useEffect(() => {
    if (page <= 1) return
    getNewRoomAdmin()
  }, [page])

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
            dataAcc?.map((room, i) => (
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
