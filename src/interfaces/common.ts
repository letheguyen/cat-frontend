import { CODE_ERROR } from '@/constants'
import React from 'react'

export type ValueOf<T> = T[keyof T]
export type IErrorCode = ValueOf<typeof CODE_ERROR>
export interface ILayoutApp {
  children: React.ReactElement
}
export interface IIcon {
  width?: string
  color?: string
  height?: string
  className?: string
  onClick?: () => void
}
export interface ILoadingModal {
  loading: boolean
}
export interface IResponsFetch {
  message: string
  errorCode: IErrorCode
}
export interface IHeadingTitle {
  title: string
  className?: string
}
export interface IFitlImage {
  url?: string | File | null
  width?: string
  height?: string
  className?: string
}
export interface IPagination {
  page: number
  limit: number
  totalPage: number
}
export interface IPaginationsPage {
  limit: number
  totalPage: number
}
export interface IThemesProvider {
  children: React.ReactElement
}
export interface IDataNoPage {
  className?: string
  height?: string
}
export interface IParamsCookies {
  page?: string | number
}
