import { IIcon } from '@/interfaces'
import clsx from 'clsx'

export const DeleteIcon = ({
  color,
  onClick,
  className = '',
  width = '25px',
  height = '25px',
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    strokeWidth="2"
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color ? color : 'currentColor'}
    className={clsx('ai ai-TrashCan', className)}
  >
    <path d="M4 6h16l-1.58 14.22A2 2 0 0 1 16.432 22H7.568a2 2 0 0 1-1.988-1.78L4 6z" />
    <path d="M7.345 3.147A2 2 0 0 1 9.154 2h5.692a2 2 0 0 1 1.81 1.147L18 6H6l1.345-2.853z" />
    <path d="M2 6h20" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
)

export const PlusIcon = ({
  onClick,
  className = '',
  width = '25px',
  height = '25px',
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    height={height}
    strokeWidth="2"
    onClick={onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('ai ai-Plus', className)}
  >
    <path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
  </svg>
)

export const DashboardIcon = ({
  width = '25px',
  className = '',
  height = '25px',
  onClick,
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    strokeWidth="2"
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('ai ai-AlignBottom', className)}
  >
    <path d="M21 22H3" />
    <path d="M6 18V2h4v16H6z" />
    <path d="M14 18V8h4v10h-4z" />
  </svg>
)

export const CategoryIcon = ({
  width = '25px',
  className = '',
  height = '25px',
  onClick,
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    height={height}
    strokeWidth="2"
    onClick={onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('ai ai-Clipboard', className)}
  >
    <path d="M15.5 4H18a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2.5" />
    <path d="M8.621 3.515A2 2 0 0 1 10.561 2h2.877a2 2 0 0 1 1.94 1.515L16 6H8l.621-2.485z" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
)

export const CategorysIcon = ({
  width = '25px',
  className = '',
  height = '25px',
  onClick,
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    height={height}
    strokeWidth="2"
    onClick={onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('ai ai-Reciept', className)}
  >
    <path d="M19 21H7a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13c0 1.657.343 3 2 3z" />
    <path d="M21 10a2 2 0 0 0-2-2h-2v10.5c0 1.38.62 2.5 2 2.5s2-1.12 2-2.5V10z" />
    <path d="M13 11H7" />
    <path d="M13 7H7" />
    <path d="M10 15H7" />
  </svg>
)

export const ProductIcon = ({
  width = '25px',
  className = '',
  height = '25px',
  onClick,
}: IIcon) => (
  <svg
    fill="none"
    width={width}
    height={height}
    strokeWidth="2"
    onClick={onClick}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('ai ai-ShippingBoxV2', className)}
  >
    <path d="M11.029 2.54a2 2 0 0 1 1.942 0l7.515 4.174a1 1 0 0 1 .514.874v8.235a2 2 0 0 1-1.029 1.748l-7 3.89a2 2 0 0 1-1.942 0l-7-3.89A2 2 0 0 1 3 15.824V7.588a1 1 0 0 1 .514-.874L11.03 2.54z" />
    <path d="M7.5 4.5l9 5V13" />
    <path d="M6 12.328L9 14" />
    <path d="M3 7l9 5m0 0l9-5m-9 5v9.5" />
  </svg>
)
