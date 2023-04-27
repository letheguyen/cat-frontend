export type ValueOf<T> = T[keyof T]

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
