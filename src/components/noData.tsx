import clsx from 'clsx'
import Image from 'next/image'
import React, { memo } from 'react'

import { IDataNoPage } from '@/interfaces'
import { Box, Text } from '@chakra-ui/react'
import imageConfirm from '/public/imageConfirm.gif'

const NoDataPage: React.FC<IDataNoPage> = ({ className, height = '100%' }) => {
  return (
    <Box pt={height} position="relative" className={clsx('w-full', className)}>
      <Box position="absolute" className="positionsCenter">
        <Image width={250} src={imageConfirm} alt="Image Error" />
        <Text
          as="h3"
          fontSize="headingTitle"
          color="colorTextDescribe"
          className="font-bold opacity-70 text-center"
        >
          No Data
        </Text>
      </Box>
    </Box>
  )
}

export default memo(NoDataPage)
