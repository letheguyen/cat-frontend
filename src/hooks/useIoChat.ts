import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'

import { useStore } from '@/store'
import { getAllRoomAdmin } from '@/services'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { IAllRoomDetail, IDataMessge, IRoomDetail } from '@/interfaces'

export const useIoChat = () => {
  const { query } = useRouter()

  // Store
  const {
    role,
    token,
    fetchRooms,
    dataAccount,
    allRoomAdmin,
    dataRoomUser,
    queueMessage,
    setDataChat,
    setRoomUser,
    setRoomAdmin,
    refetchRooms,
    setQueueMessage,
    setDataUserOnline,
  } = useStore()

  // Socket
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string)

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

  // Refetch rooms
  useEffect(() => {
    if (fetchRooms) {
      handleGetRooms()
    }
  }, [fetchRooms])

  // Event socket
  useEffect(() => {
    if (token) {
      handleGetRooms()
      socket.emit('LOGIN', token)
      socket.on('ACCOUNT_ONLINE', (arrayAccount: string[]) => {
        setDataUserOnline(arrayAccount)
      })
    }
  }, [token])

  // Event socket
  useEffect(() => {
    if (token && dataRoomUser) {
      socket.on(dataRoomUser._id, (sendMessage: IDataMessge) => {
        console.log(sendMessage)
        setDataChat([sendMessage])
      })
    }
  }, [dataRoomUser])

  // Event socket
  useEffect(() => {
    const isAdmin = role === ROLE_APP.ADMIN
    const dataRooms = allRoomAdmin?.data

    if (isAdmin && dataRooms) {
      dataRooms.map((room) => {
        if (!query.chatId) return
        socket.on(room._id, (sendMessage: IDataMessge) => {
          if (
            (sendMessage.idRoom === room._id &&
              query.chatId === sendMessage.from) ||
            sendMessage.from === dataAccount?._id
          ) {
            queueMessage ? setDataChat([]) : []
          } else {
            setQueueMessage([sendMessage.from])
          }
        })
      })
    }
  }, [allRoomAdmin, query])
}
