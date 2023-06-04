import clsx from 'clsx'
import Link from 'next/link'
import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import { ILayoutApp } from '@/interfaces'
import { PATH_NAME } from '@/constants'
import {
  CategoryIcon,
  CategorysIcon,
  DashboardIcon,
  ProductIcon,
  ProductIconList,
} from '@/icons'
import Navbar from './navbar'

const LayoutAdminSite: React.FC<ILayoutApp> = ({ children }) => {
  const { pathname } = useRouter()

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
      href: PATH_NAME.categorys + '?page=1',
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
    {
      id: 5,
      href: PATH_NAME.products,
      content: (
        <>
          <ProductIconList width="30" height="22" className="mr-1" />
          Products
        </>
      ),
    },
    {
      id: 6,
      href: PATH_NAME.createProduct,
      content: (
        <>
          <ProductIcon width="30" height="22" className="mr-1" />
          Create Product
        </>
      ),
    },
  ]

  return (
    <Box>
      <Navbar />
      <Box maxW="maxLayoutAdmin" margin="auto" className="flex gap-7 px-4">
        <Box
          bg="backgroundMenuApp"
          className="w-56 max-w-sm top-0 pt-16 pl-4 min-h-screen"
        >
          <Box className="sticky left-0 top-20 flex flex-col gap-4">
            {dataMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  'text-sizeMenuAdmin flex transition-all ease-in hover:opacity-100 items-center',
                  item.href.split('?').includes(pathname)
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
    </Box>
  )
}

export default memo(LayoutAdminSite)
