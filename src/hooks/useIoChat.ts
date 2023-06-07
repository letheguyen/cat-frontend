import { useEffect } from 'react'

import { socket } from '@/utils'
import { useStore } from '@/store'
import { getAllRoomAdmin, getDetailRoomChat } from '@/services'
import { LIMIT_ROOMS, ROLE_APP } from '@/constants'
import { IAllRoomDetail, IDataMessge, IRoomDetail } from '@/interfaces'

export const useIoChat = () => {
  // Store
  const {
    role,
    token,
    fetchRooms,
    setDataChat,
    dataAccount,
    usersOnline,
    dataRoomUser,
    setRoomUser,
    setRoomAdmin,
    refetchRooms,
    setDataUserOnline,
  } = useStore()

  // Get rooms data
  const handleGetRooms = async () => {
    if (token && role === ROLE_APP.ADMIN) {
      const allRoomsAdmin: IAllRoomDetail | null = await getAllRoomAdmin({
        page: 1,
        limit: LIMIT_ROOMS,
      })
      setRoomAdmin(allRoomsAdmin)
    }

    if (token && role === ROLE_APP.USER) {
      const roomUser: IRoomDetail | null = await getAllRoomAdmin()
      setRoomUser(roomUser ? roomUser : null)
    }
    refetchRooms(null)
  }

  // Refetch rooms
  useEffect(() => {
    if (fetchRooms) {
      handleGetRooms()
    }
  }, [fetchRooms])

  // Event socket
  useEffect(() => {
    const isAdmin = role === ROLE_APP.ADMIN

    if (token) {
      handleGetRooms()
      socket.emit('LOGIN', token)

      socket.on('ACCOUNT_ONLINE', (arrayAccount: string[]) => {
        setDataUserOnline(arrayAccount)
      })
    }
  }, [dataAccount])

  // Event socket
  useEffect(() => {
    if (token && dataRoomUser) {
      socket.on(dataRoomUser._id, (sendMessage: IDataMessge) => {
        setDataChat([sendMessage])
      })
    }
  }, [dataRoomUser])
}
