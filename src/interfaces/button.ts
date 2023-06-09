import { ValueOf } from './common'
import { ButtonsType } from '@/constants'

export type IButtonType = ValueOf<typeof ButtonsType>
export interface IPropsButtons {
  title: string
  disabled?: boolean
  styleText?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  buttonType?: IButtonType
}
