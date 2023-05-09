import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react'

import { useStore } from '@/store'
import { ILayoutApp } from '@/interfaces'
import { PATH_NAME, USER_PATH } from '@/constants'
import { CategoryIcon, CategorysIcon, DashboardIcon } from '@/icons'
import defaultAvatar from '/public/defaultAvatar.jpg'

const LayoutAdminSite: React.FC<ILayoutApp> = ({ children }) => {
  const { dataAccount } = useStore()
  const { push, pathname } = useRouter()

  const dataNav = [
    {
      id: 3,
      style: 'ml-auto',
      content: (
        <Box className="flex gap-3 justify-center items-center">
          <Text color="colorPrimary">{dataAccount?.userName}</Text>
          <Box className="block border-2 rounded-full border-colorPrimary w-10 h-10 overflow-hidden">
            <Image
              className="w-full"
              width={44}
              height={44}
              src={dataAccount?.avatar || defaultAvatar}
              alt="Avata"
            />
          </Box>
        </Box>
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
        <TabList
          bg="white"
          borderBottomWidth="thin"
          className="fixed w-full z-50"
          borderBottomColor="colorPrimary"
        >
          {dataNav.map((tabs) => (
            <Tab
              key={tabs.id}
              color="transparent"
              className={clsx(tabs.style)}
              onClick={() => push(clsx(tabs.href))}
            >
              {tabs.content}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Box className="flex gap-7 px-4 ">
        <Box
          bg="backgroundMenuApp"
          className="w-1/4 max-w-sm top-0 pt-16 pl-4 min-h-screen"
        >
          <Box className="sticky left-0 top-20 flex flex-col gap-4">
            {dataMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  'text-[22px] flex hover:opacity-100 items-center',
                  item.href === pathname
                    ? 'opacity-100 text-colorPrimary'
                    : 'opacity-60'
                )}
              >
                {item.content}
              </Link>
            ))}
          </Box>
        </Box>

        <Box className="pt-16 pb-7 flex-1">{children}</Box>
      </Box>
    </>
  )
}

export default memo(LayoutAdminSite)
