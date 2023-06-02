import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { useStore } from '@/store'
import FitlImage from '@/components/fitlImage'
import {
  getCategorys,
  deleteCategorys,
  updateStatusCategorys,
} from '@/services'
import {
  CODE_ERROR,
  ERROR_DATA,
  FLAG_STATUS_CATEGORY,
  LIMIT_PAGE,
  MODAL_TYPE,
  PATH_NAME,
  STATUS_CATEGORY,
  TIME_CLOSE_MODAL_SUCCESS,
} from '@/constants'
import {
  IDetailCategory,
  IPagination,
  IResponCategory,
  IStatusCategory,
} from '@/interfaces'
import { ButtonPrimary, HeadingTitle, NoDataPage, Paginate } from '@/components'

const Categorys = () => {
  const { push, query, reload } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
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

  const updateCategory = useCallback((id: string, status: IStatusCategory) => {
    setDataModal({
      messageModal: 'Confirm update',
      modalKey: MODAL_TYPE.commonConfirm,
      onOk: () => handleUpdateStatusCategory(id, status),
    })
    // eslint-disable-next-line
  }, [])

  const handleUpdateStatusCategory = async (
    id: string,
    status: IStatusCategory
  ) => {
    setLoading(true)

    const newStatus =
      status === STATUS_CATEGORY.pause
        ? STATUS_CATEGORY.start
        : STATUS_CATEGORY.pause

    const res = await updateStatusCategorys(id, newStatus)
    setLoading(false)

    if (res?.errorCode === CODE_ERROR.UPDATE_SUCCESS) {
      setDataModal({
        messageModal: ERROR_DATA[res?.errorCode],
        modalKey: MODAL_TYPE.commonSuccess,
      })

      handleGetCategory(Number(query.page))

      setTimeout(() => {
        closeModal()
      }, TIME_CLOSE_MODAL_SUCCESS)
    } else {
      setDataModal({
        messageModal: 'Category ' + ERROR_DATA[res?.errorCode],
        modalKey: MODAL_TYPE.commonError,
      })
    }
  }

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
      <Box className="grid grid-cols-4 gap-4 mt-3 max-xl:grid-cols-3 max-lg:grid-cols-2">
        {dataCategorys?.map((category) => (
          <Box
            key={category._id}
            bg="backgroundItem"
            borderRadius="item"
            className="blockItem"
          >
            <Box key={category._id}>
              <FitlImage height="60%" url={category.background}>
                {
                  <Text
                    style={FLAG_STATUS_CATEGORY?.[category.status]?.style}
                    fontSize="statusHeading"
                    className="positionsCenter text-white px-8 py-1"
                  >
                    {FLAG_STATUS_CATEGORY?.[category.status]?.title}
                  </Text>
                }
              </FitlImage>
              <Box className="flex gap-3 items-center py-3">
                <FitlImage
                  width="12%"
                  url={category.avatar}
                  className="hover:scale-110 shadow-fourDirections overflow-hidden rounded-full border border-colorPrimary"
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
              <Text>Product: {category.productsCount}</Text>

              <Box className="grid grid-cols-2 gap-3 mt-1">
                <ButtonPrimary
                  type="button"
                  title="Edit"
                  onClick={() =>
                    push(`${PATH_NAME.categorysEdit}/${category._id}`)
                  }
                  className="!min-w-max !rounded-md"
                />
                <ButtonPrimary
                  title="Delete"
                  type="button"
                  buttonType="error"
                  className="!min-w-max !rounded-md"
                  onClick={() => deleteCategory(category._id)}
                />
              </Box>

              <Box className="mt-4">
                <Text>Update status</Text>
                <Box className="grid grid-cols-2 gap-3 mt-1">
                  <ButtonPrimary
                    type="button"
                    title="Start"
                    className="!min-w-max !rounded-md"
                    disabled={category.status === STATUS_CATEGORY.start}
                    onClick={() =>
                      updateCategory(category._id, category.status)
                    }
                  />
                  <ButtonPrimary
                    title="Pause"
                    type="button"
                    buttonType="error"
                    className="!min-w-max !rounded-md"
                    disabled={category.status === STATUS_CATEGORY.pause}
                    onClick={() =>
                      updateCategory(category._id, category.status)
                    }
                  />
                </Box>
              </Box>
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
