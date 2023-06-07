import { API_URL } from '@/constants'
import {
  IDataRoom,
  IParamsGetRooms,
  IResponsFetch,
  IResponseDetailRoom,
  IResponseRooms,
} from '@/interfaces'
import { fetch } from '../axios'

export const createChatRoom = async (idUser: string) => {
  try {
    return (await fetch.post(API_URL.roomChat, { idUser })) as IResponsFetch
  } catch (error) {
    return null
  }
}

export const getAllRoomAdmin = async (params?: IParamsGetRooms) => {
  try {
    return (await fetch.get(API_URL.roomChat, {
      params,
    })) as any
  } catch (error) {
    return null
  }
}

export const getDetailRoomChat = async (
  params: IParamsGetRooms,
  id: string
) => {
  try {
    return (await fetch.get(API_URL.detailroomChat.replace(':id', id), {
      params,
    })) as IResponseDetailRoom
  } catch (error) {
    return null
  }
}
