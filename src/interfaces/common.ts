import { CODE_ERROR } from '@/constants'

export type ValueOf<T> = T[keyof T]
export type IButtonType = ValueOf<typeof CODE_ERROR>

export interface ILayoutApp {
  children: React.ReactElement
}

export interface IIcon {
  width?: string
  height?: string
  color?: string
  className?: string
  onClick?: () => void
}

export interface ILoadingModal {
  loading: boolean
}

export interface IResponsFetch {
  message: string
  errorCode: IButtonType
}

export interface IHeadingTitle {
  className?: string
  title: string
}
