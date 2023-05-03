import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { Tab, TabList, Tabs } from '@chakra-ui/react'

import { useStore } from '@/store'
import { PATH_NAME, USER_PATH } from '@/constants'
import { ILayoutApp } from '@/interfaces'
import defaultAvatar from '/public/defaultAvatar.jpg'
import { CategoryIcon, CategorysIcon, DashboardIcon } from '@/icons'

const LayoutAdminSite: React.FC<ILayoutApp> = ({ children }) => {
  const { dataAccount } = useStore()
  const { push, pathname } = useRouter()

  const dataNav = [
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

  const dataMenu = [
    {
      id: 1,
      href: PATH_NAME.admin,
      content: (
        <>
          <DashboardIcon width="30" height="22" className="mr-1" />
          Dashboard
        </>
      ),
    },
    {
      id: 3,
      href: PATH_NAME.categorys,
      content: (
        <>
          <CategorysIcon width="30" height="22" className="mr-1" />
          Categorys
        </>
      ),
    },
    {
      id: 4,
      href: PATH_NAME.categoryCreate,
      content: (
        <>
          <CategoryIcon width="30" height="22" className="mr-1" />
          Create Category
        </>
      ),
    },
  ]

  return (
    <>
      <Tabs>
        <TabList className="fixed w-full bg-white z-[99] !border-b-2 !border-[var(--primary-color)]">
          {dataNav.map((tabs) => (
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
            {dataMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  'text-[22px] flex hover:opacity-100 items-center',
                  item.href === pathname
                    ? 'opacity-100 text-[var(--primary-color)]'
                    : 'opacity-60'
                )}
              >
                {item.content}
              </Link>
            ))}
          </div>
        </div>
        <div className="pt-16 pb-7 flex-1">{children}</div>
      </div>
    </>
  )
}

export default memo(LayoutAdminSite)
