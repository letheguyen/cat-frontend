import clsx from 'clsx'
import React, { memo, useEffect, useState } from 'react'

import { IFitlImage } from '@/interfaces'
import { Box } from '@chakra-ui/react'
import noImage from 'public/noImage.png'

const FitlImage: React.FC<IFitlImage> = ({
  url,
  className,
  width = '100%',
  height = '100%',
}) => {
  const [image, setImage] = useState<string | null | File>()

  const handleShowImagePiewView = (data: undefined | null | File | string) => {
    switch (typeof data) {
      case 'string':
        return data
      case 'undefined':
        return noImage.src
      default:
        if (data) {
          return URL.createObjectURL(data)
        } else {
          return noImage.src
        }
    }
  }

  useEffect(() => {
    const urlImage = handleShowImagePiewView(url)
    setImage(urlImage)
  }, [url])

  return (
    <Box
      className={clsx(
        className,
        'overflow-hidden transition-all ease-linear  hover:cursor-pointer'
      )}
      style={{
        width: width,
      }}
    >
      <Box
        style={{
          paddingTop: height,
          backgroundPosition: 'center',
          backgroundImage: 'url(' + image + ')',
        }}
        className="bg-cover"
      ></Box>
    </Box>
  )
}

export default memo(FitlImage)
