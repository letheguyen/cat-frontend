import clsx from 'clsx'
import { useStore } from '@/store'
import React, { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import FitlImage from '../fitlImage'
import { ROLE_APP } from '@/constants'
import { IDataAccountTop } from '@/interfaces'

const UserMessenger: React.FC<IDataAccountTop> = ({
  dataAccount,
  isChild = false,
  className,
}) => {
  const { usersOnline, role, waitingLine } = useStore()
  const { push, pathname } = useRouter()

  return (
    <Box
      onClick={() => {
        if (role !== ROLE_APP.ADMIN) return
        push({ pathname, query: { userId: dataAccount._id } })
      }}
      className={clsx(
        'flexItem gap-3 cursor-pointer hover:bg-colorPrimary/10 ',
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
            'block mb-0 leading-6 transition-all ease-in',
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
              'rounded-full transition-all ease-in',
              isChild ? 'w-2 h-2 ' : 'w-3 h-3 ',
              usersOnline.includes(dataAccount._id)
                ? 'bg-colorPrimary'
                : 'bg-backgroundReject'
            )}
          ></div>
          {usersOnline.includes(dataAccount._id) ? 'Online' : 'Recent Activity'}
        </span>
      </Box>

      {waitingLine?.includes(dataAccount._id) && (
        <Box className="ml-auto mr-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-colorActiveMessage"></span>
        </Box>
      )}
    </Box>
  )
}

export default memo(UserMessenger)
