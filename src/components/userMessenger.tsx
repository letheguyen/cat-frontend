import clsx from 'clsx'
import { useStore } from '@/store'
import { Box } from '@chakra-ui/react'
import React, { memo } from 'react'

import FitlImage from './fitlImage'
import { IDataAccountTop } from '@/interfaces'

const UserMessenger: React.FC<IDataAccountTop> = ({ dataAccount }) => {
  const { usersOnline } = useStore()

  console.log(usersOnline, dataAccount)

  return (
    <Box className="flexItem gap-3 cursor-pointer">
      <FitlImage
        width="40px"
        className="rounded-full overflow-hidden border border-colorPrimary"
        url={dataAccount?.avatar}
      />
      <Box className="flex-col">
        <p className="block mb-0 leading-6">{dataAccount.userName}</p>
        <span className="flexItem text-sm leading-4 gap-1">
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
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
