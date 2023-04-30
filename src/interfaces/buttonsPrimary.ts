import { ButtonsType } from '@/constants'
import { ValueOf } from './common'

export type IButtonType = ValueOf<typeof ButtonsType>
export interface IPropsButtons {
  className?: string
  type?: 'button' | 'submit'
  title: string
  textColor?: string
  onClick?: () => void
  buttonType?: IButtonType
  disabled?: boolean
}
