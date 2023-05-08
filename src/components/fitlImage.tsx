import clsx from 'clsx'
import React, { memo, useEffect, useState } from 'react'

import { IFitlImage } from '@/interfaces'
import { Box } from '@chakra-ui/react'
import noImage from 'public/noImage.png'

const FitlImage: React.FC<IFitlImage> = (props) => {
  const [image, setImage] = useState(noImage.src)

  useEffect(() => {
    if (!props.url) return
    setImage(props.url)
  }, [props.url])

  const stylesWidth = {
    width: props.width || '100%',
  }

  const stylesHeight = {
    paddingTop: props.height || '100%',
  }

  return (
    <Box
    className={clsx(
      props.className,
      'overflow-hidden transition-all ease-linear hover:cursor-pointer'
      )}
      style={stylesWidth}
    >
      <Box
        style={{
          ...stylesHeight,
          backgroundPosition: 'center',
          backgroundImage: 'url(' + image + ')',
        }}
        className="bg-cover"
      ></Box>
    </Box>
  )
}

export default memo(FitlImage)
