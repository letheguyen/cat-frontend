export interface IPropsButtons {
  className?: string,
  type?: 'button' | 'submit',
  title: string,
  textColor?: string,
  onClick?: () => void
}