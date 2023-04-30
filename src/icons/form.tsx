import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const DeleteIcon = ({
  width = '25px',
  height = '25px',
  color,
  className = '',
  onClick,
}: IIcon) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color ? color : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx('ai ai-TrashCan', className)}
  >
    <path d="M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z" />
    <path d="M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z" />
    <path d="M2 6h20" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
)
