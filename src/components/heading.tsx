import clsx from 'clsx'
import React, { memo } from 'react'
import { IHeadingTitle } from '@/interfaces'

const HeadingTitle: React.FC<IHeadingTitle> = (props) => {
  return (
    <div className={clsx('py-6', props.className ?? '')}>
      <h2 className="pl-8 text-[28px] text-[var(--primary-color)] relative after:content-[''] after:absolute after:h-full after:w-1.5 after:top-0 after:left-0 after:bg-[var(--primary-color)]">
        {props.title}
      </h2>
    </div>
  )
}

export default memo(HeadingTitle)
