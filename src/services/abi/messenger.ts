import { API_URL } from '@/constants'
import {
  IDataRoom,
  IParamsGetRooms,
  IResponsFetch,
  IResponseRooms,
} from '@/interfaces'
import { fetch } from '../axios'

export const createChatRoom = async (idUser: string) => {
  try {
    return (await fetch.post(API_URL.rommChat, { idUser })) as IResponsFetch
  } catch (error) {
    return null
  }
}

export const getAllRoomAdmin = async (params: IParamsGetRooms) => {
  try {
    return (await fetch.get(API_URL.rommChat, {
      params,
    })) as IResponseRooms
  } catch (error) {
    return null
  }
}

export const getDetailRoomChat = async (
  params: IParamsGetRooms,
  id: string
) => {
  try {
    return (await fetch.get(API_URL.detailRommChat.replace(':id', id), {
      params,
    })) as IResponseRooms
  } catch (error) {
    return null
  }
}
