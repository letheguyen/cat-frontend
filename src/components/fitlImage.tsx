import clsx from 'clsx'
import React, { memo, useEffect, useState } from 'react'

import { IFitlImage } from '@/interfaces'
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
    <div
      style={stylesWidth}
      className={clsx(
        props.className,
        'overflow-hidden transition-all ease-linear hover:cursor-pointer'
      )}
    >
      <div
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundPosition: 'center',
          ...stylesHeight,
        }}
        className="bg-cover"
      ></div>
    </div>
  )
}

export default memo(FitlImage)
