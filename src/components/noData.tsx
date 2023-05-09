import clsx from 'clsx'
import Image from 'next/image'
import React, { memo } from 'react'

import imageConfirm from '/public/imageConfirm.gif'
import { Box, Text } from '@chakra-ui/react'
import { IDataNoPage } from '@/interfaces'

const NoDataPage: React.FC<IDataNoPage> = ({className}) => {
  return (
    <Box pt="100%" position="relative" className={clsx("w-full", className)}>
      <Box position="absolute" className='positionsCenter'>
        <Image width={250} src={imageConfirm} alt="Image Error" />
        <Text
          as="h3"
          color="colorTextDescribe"
          fontSize="headingTitle"
          className="font-bold opacity-70 text-center"
        >
          No Data
        </Text>
      </Box>
    </Box>
  )
}

export default memo(NoDataPage)
