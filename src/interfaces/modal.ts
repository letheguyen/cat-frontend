import { ReactNode } from "react"
import { modalType } from "./store"

export interface IModalType {
  messageModal: null | string
  modalKey: modalType | null,
  showModal?: boolean,
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
  noButtonFooter?: boolean,
  children: ReactNode,
  noIconClose?: boolean,
  textBtnAccept?: string,
  textBtnClose?: string,
}