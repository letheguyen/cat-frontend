import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'

import { useStore } from '@/store'
import { getAllRoomAdmin } from '@/services'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { IAllRoomDetail, IDataMessge, IRoomDetail } from '@/interfaces'

export const useIoChat = () => {
  // State
  const { query } = useRouter()
  const chatOld = useRef<IDataMessge>()
  const { chatId } = query

  // Store
  const {
    role,
    token,
    fetchRooms,
    dataAccount,
    allRoomAdmin,
    dataRoomUser,
    queueMessage,
    dataChat,
    setDataChat,
    setRoomUser,
    setRoomAdmin,
    refetchRooms,
    setQueueMessage,
    setDataUserOnline,
  } = useStore()

  // Socket
  const ws = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

  // Get rooms data
  const handleGetRooms = async () => {
    if (token && role === ROLE_APP.ADMIN) {
      const allRoomsAdmin: IAllRoomDetail | null = await getAllRoomAdmin({
        page: 1,
        limit: LIMIT_ROOMS,
      })
      refetchRooms(null)
      setRoomAdmin(allRoomsAdmin)
    }

    if (token && role === ROLE_APP.USER) {
      const roomUser: IRoomDetail | null = await getAllRoomAdmin()
      setRoomUser(roomUser ? roomUser : null)
      refetchRooms(null)
    }
  }

  // Event ws
  useEffect(() => {
    if (token) {
      handleGetRooms()
      ws.emit('LOGIN', token)
      ws.on('ACCOUNT_ONLINE', (arrayAccount: string[]) => {
        setDataUserOnline(arrayAccount)
      })
    }
  }, [token])

  // Refetch rooms
  useEffect(() => {
    if (fetchRooms) {
      handleGetRooms()
    }
  }, [fetchRooms])

  // Event ws
  useEffect(() => {
    if (token && dataRoomUser) {
      ws.on(dataRoomUser._id, (sendMessage: IDataMessge) => {
        setDataChat([sendMessage])
      })
    }
  }, [dataRoomUser])

  // Event ws
  useEffect(() => {
    if (chatId && allRoomAdmin && dataAccount) {
      const { data } = allRoomAdmin

      data?.map((room) => {
        ws.on(room._id, (chat: IDataMessge) => {
          const { created, from, idRoom, to } = chat
          if (created === chatOld.current?.created) return
          console.log(chatId, room.userId)
          if (idRoom === room._id && chatId === room.userId) {
            setDataChat([chat])
          }
          chatOld.current = chat
        })
      })
    }
  }, [chatId as string, dataAccount])
}
