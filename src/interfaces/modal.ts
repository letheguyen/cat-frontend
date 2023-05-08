import { ReactNode } from "react"
import { modalType } from "./store"
export interface IModalType {
  onOk?: () => void,
  showModal?: boolean,
  onClose?: () => void,
  messageModal: null | string
  modalKey: modalType | null,
}
export interface IPropsRootModal {
  children?: ReactNode
}
export interface IModal {
  width?: string,
  height?: string,
  className?:string,
  children: ReactNode,
  textBtnClose?: string,
  noIconClose?: boolean,
  textBtnAccept?: string,
  noButtonFooter?: boolean,
}