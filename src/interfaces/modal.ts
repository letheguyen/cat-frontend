import { ReactNode } from "react"
import { modalType } from "./store"

export interface IModalType {
  messageModal: null | string
  showModal: boolean,
  modalKey: modalType | null,
  onOk?: () => void,
  onClose?: () => void,
}

export interface IPropsRootModal {
  children?: ReactNode
}

export interface IModal {
  className?:string,
  width?: string,
  height?: string,
  noButton?: boolean
}