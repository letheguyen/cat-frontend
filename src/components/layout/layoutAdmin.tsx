import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'

import { useStore } from '@/store'
import { ADMIN_PATH, PATH_NAME, USER_PATH } from '@/constants'
import { ILayoutApp } from '@/interfaces'
import defaultAvatar from '/public/defaultAvatar.jpg'
import Link from 'next/link'
import { CategoryIcon, DashboardIcon, PlusIcon } from '@/icons'

const LayoutAdminSite: React.FC<ILayoutApp> = ({ children }) => {
  const { dataAccount } = useStore()
  const { query, push, pathname } = useRouter()
  const [tabIndex, setTabIndex] = useState(0)

  const dataTabs = [
    {
      id: 3,
      style: 'ml-auto',
      content: (
        <div className="flex gap-3 justify-center items-center">
          <span>{dataAccount?.userName}</span>
          <div className="block border-2 rounded-full border-[var(--primary-color)] w-10 h-10 overflow-hidden">
            <Image
              className="w-full"
              width={44}
              height={44}
              src={dataAccount?.avatar || defaultAvatar}
              alt="Avata"
            />
          </div>
        </div>
      ),
      href: clsx(USER_PATH.user + dataAccount?._id),
    },
  ]

  return (
    <>
      <Tabs defaultIndex={tabIndex}>
        <TabList className="fixed w-full bg-white z-30 !border-b-2 !border-[var(--primary-color)]">
          {dataTabs.map((tabs) => (
            <Tab
              color="transparent"
              key={tabs.id}
              className={clsx(tabs.style)}
              onClick={() => push(clsx(tabs.href))}
            >
              {tabs.content}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <div className="flex gap-7 px-4 main-layout-admin">
        <div className="w-1/4 max-w-sm top-0 pt-16 pl-4 min-h-screen bg-[var(--bg-menu-layout-admin)]">
          <div className="sticky left-0 top-20 flex flex-col gap-4">
            <Link
              href={PATH_NAME.admin}
              className={clsx(
                'text-[22px] opacity-60 flex hover:opacity-100',
                PATH_NAME.admin === pathname && 'opacity-100 text-[var(--primary-color)]'
              )}
            >
              <DashboardIcon width='30' height='22' className='mr-1'/> Dashboard
            </Link>
            <Link
              href={PATH_NAME.categoryCreate}
              className={clsx(
                'text-[22px] opacity-60  flex hover:opacity-100',
                PATH_NAME.categoryCreate === pathname && 'opacity-100 text-[var(--primary-color)]'
              )}
            >
              <CategoryIcon width='30' height='22' className='mr-1'/> Create Category
            </Link>
          </div>
        </div>
        <div className="pt-16 pb-7 flex-1">{children}</div>
      </div>
    </>
  )
}

export default memo(LayoutAdminSite)
