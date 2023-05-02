import clsx from 'clsx'
import Image from 'next/image'
import React, { memo } from 'react'

import imageConfirm from '/public/imageConfirm.gif'

const NoDataPage = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col m-auto justify-center items-center">
      <Image
        width={250}
        src={imageConfirm}
        alt="Image Error"
      />
      <h3 className='font-bold text-heading opacity-70'>No Data</h3>
    </div>
  )
}

export default memo(NoDataPage)
