import clsx from 'clsx'
import React, { memo } from 'react'
import { IHeadingTitle } from '@/interfaces'

import { Box, Text } from '@chakra-ui/react'

const HeadingTitle: React.FC<IHeadingTitle> = (props) => {
  return (
    <Box className={clsx('py-6', props.className)}>
      <Text
        color="colorPrimary"
        fontSize="headingTitle"
        className="pl-8 relative after:content-[''] after:absolute after:h-full after:w-1.5 after:top-0 after:left-0 after:bg-colorPrimary"
      >
        {props.title}
      </Text>
    </Box>
  )
}

export default memo(HeadingTitle)
