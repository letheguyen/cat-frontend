import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { useStore } from '@/store'
import FitlImage from '@/components/fitlImage'
import { getCategorys, deleteCategorys } from '@/services'
import { LIMIT_PAGE, MODAL_TYPE, PATH_NAME } from '@/constants'
import { IDetailCategory, IPagination, IResponCategory } from '@/interfaces'
import { ButtonPrimary, HeadingTitle, NoDataPage, Paginate } from '@/components'

const Categorys = () => {
  const { push, query } = useRouter()
  const { setLoading, setDataModal } = useStore()
  const [dataPaginate, setDataPaginate] = useState<IPagination>()
  const [dataCategorys, setDataCategory] = useState<IDetailCategory[] | null>()

  const handleGetCategory = useCallback(async (page?: number) => {
    const data: IResponCategory | null = await getCategorys({
      page: page || 1,
      limit: LIMIT_PAGE,
    })
    setDataCategory(data?.data)
    setDataPaginate(data?.pagination)
    // eslint-disable-next-line
  }, [])

  const deleteCategory = useCallback(async (id: string) => {
    setDataModal({
      messageModal: 'Confirm delete',
      modalKey: MODAL_TYPE.commonConfirm,
      onOk: () => confirmDelete(id),
    })
    // eslint-disable-next-line
  }, [])

  const confirmDelete = useCallback(async (id: string) => {
    setLoading(true)
    const res = await deleteCategorys(id)
    setLoading(null)
    if (res) {
      await handleGetCategory(Number(query?.page))
      setDataModal({
        messageModal: 'Delete success',
        modalKey: MODAL_TYPE.commonSuccess,
      })
    } else {
      setDataModal({
        messageModal: 'Delete failed',
        modalKey: MODAL_TYPE.commonError,
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setLoading(true)
    const page = query.page as string | undefined
    handleGetCategory(Number(page))
    // eslint-disable-next-line
  }, [query?.page])

  useEffect(() => {
    if (dataCategorys) {
      setTimeout(() => {
        setLoading(null)
      }, 600)
    }
    // eslint-disable-next-line
  }, [dataCategorys])

  return (
    <Box className="h-full">
      <HeadingTitle title="Categorys" />
      <Box className="grid grid-cols-4 gap-4 mt-3 max-2xl:grid-cols-3 max-lg:grid-cols-2">
        {dataCategorys?.map((category) => (
          <Box
            key={category._id}
            bg="backgroundCategory"
            borderRadius="category"
            className="border border-borderItemColor rounded-lg p-4 shadow transition-all ease-linear hover:shadow-lg hover:cursor-pointer hover:-translate-y-1"
          >
            <Box key={category._id}>
              <FitlImage height="60%" url={category.background} />
              <Box className="flex gap-3 items-center py-3">
                <FitlImage
                  width="12%"
                  url={category.avatar}
                  className="hover:scale-110 shadow-fourDirections rounded-full border border-colorPrimary"
                />
                <Text className="text-heading line-clamp-1">
                  {category.title}
                </Text>
              </Box>
              <Text
                as="span"
                className="text-des line-clamp-3 mb-3 h-heightDescribeCategory overflow-hidden"
              >
                {category.description}
              </Text>
              <Text>Product: 0</Text>

              <Text className="grid grid-cols-2 gap-3 mt-1">
                <ButtonPrimary
                  type="button"
                  title="Update"
                  onClick={() =>
                    push(`${PATH_NAME.categorysEdit}/${category._id}`)
                  }
                  className="!min-w-max !rounded-md"
                />
                <ButtonPrimary
                  title="Delete"
                  type="button"
                  onClick={() => deleteCategory(category._id)}
                  buttonType="error"
                  className="!min-w-max !rounded-md"
                />
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {dataCategorys && !dataCategorys.length && (
        <NoDataPage height="85%" className="-mt-20" />
      )}

      {dataPaginate && (
        <Paginate
          limit={dataPaginate.limit}
          totalPage={dataPaginate.totalPage}
        />
      )}
    </Box>
  )
}

export default memo(Categorys)
