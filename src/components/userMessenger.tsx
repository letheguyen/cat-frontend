import clsx from 'clsx'
import { useStore } from '@/store'
import { Box } from '@chakra-ui/react'
import React, { memo } from 'react'

import FitlImage from './fitlImage'
import { IDataAccountTop } from '@/interfaces'

const UserMessenger: React.FC<IDataAccountTop> = ({
  dataAccount,
  isChild = false,
  className,
}) => {
  const { usersOnline } = useStore()

  return (
    <Box
      className={clsx(
        'flexItem gap-3 cursor-pointer hover:bg-colorPrimary/10',
        isChild && 'border-l border-l-colorPrimary/20 pl-3',
        className
      )}
    >
      <FitlImage
        width={isChild ? '30px' : '40px'}
        className="rounded-full overflow-hidden border border-colorPrimary"
        url={dataAccount?.avatar}
      />
      <Box className="flex-col">
        <p
          className={clsx(
            'block mb-0 leading-6',
            isChild && 'text-base opacity-75 leading-5'
          )}
        >
          {dataAccount.userName}
        </p>
        <span
          className={clsx(
            'flexItem text-sm leading-4 gap-1',
            isChild && 'text-xs'
          )}
        >
          <div
            className={clsx(
              'rounded-full',
              isChild ? 'w-2 h-2 ' : 'w-3 h-3 ',
              usersOnline.includes(dataAccount._id)
                ? 'bg-colorPrimary'
                : 'bg-backgroundReject'
            )}
          ></div>
          {usersOnline.includes(dataAccount._id) ? 'Online' : 'Recent Activity'}
        </span>
      </Box>
    </Box>
  )
}

export default memo(UserMessenger)
