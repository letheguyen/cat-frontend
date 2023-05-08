import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'

import { useStore } from '@/store'
import FitlImage from '@/components/fitlImage'
import { getCategorys, deleteCategorys } from '@/services'
import { LIMIT_PAGE, MODAL_TYPE, PATH_NAME } from '@/constants'
import { IDetailCategory, IPagination, IResponCategory } from '@/interfaces'
import { ButtonPrimary, HeadingTitle, NoDataPage, Paginate } from '@/components'
import { Box, Text } from '@chakra-ui/react'

const Categorys = () => {
  const { push } = useRouter()
  const [page, setPage] = useState(1)
  const { setLoading, setDataModal } = useStore()
  const [dataPaginate, setDataPaginate] = useState<IPagination>()
  const [dataCategorys, setDataCategory] = useState<IDetailCategory[] | null>()

  const handleGetCategory = async () => {
    const data: IResponCategory | null = await getCategorys({
      page,
      limit: LIMIT_PAGE,
    })
    setDataCategory(data?.data)
    setDataPaginate(data?.pagination)
  }

  const deleteCategory = async (id: string) => {
    setDataModal({
      messageModal: 'Confirm delete',
      modalKey: MODAL_TYPE.commonConfirm,
      onOk: () => confirmDelete(id),
    })
  }

  const confirmDelete = async (id: string) => {
    setLoading(true)
    const res = await deleteCategorys(id)
    setLoading(null)
    if (res) {
      await handleGetCategory()
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
  }

  useEffect(() => {
    setLoading(true)
    handleGetCategory()
  }, [page])

  useEffect(() => {
    if (!dataCategorys) return
    setTimeout(() => {
      setLoading(null)
    }, 600)
  }, [dataCategorys])

  return (
    <Box className="h-full">
      <HeadingTitle title="Categorys" />
      <Box className="grid grid-cols-4 gap-4 mt-3 max-2xl:grid-cols-3 max-lg:grid-cols-2">
        {dataCategorys?.map((category) => (
          <Box
            key={category._id}
            border="borderColorInput"
            className="border rounded-lg p-4 shadow transition-all ease-linear hover:shadow-lg hover:cursor-pointer hover:-translate-y-1"
          >
            <Box key={category._id}>
              <FitlImage height="60%" url={category.background} />
              <Box className="flex gap-3 items-center py-3">
                <FitlImage
                  width="12%"
                  url={category.avatar}
                  className="hover:scale-110 shadow-lg shadow-itemsShadow rounded-full border border-primaryColor"
                />
                <Text className="text-heading line-clamp-1">
                  {category.title}
                </Text>
              </Box>
              <Text as="span" className="text-des line-clamp-3 mb-3">
                {category.description}
              </Text>
              <Text>Product: 0</Text>

              <Text className="flex gap-4 mt-1">
                <ButtonPrimary
                  type="button"
                  title="Update"
                  onClick={() =>
                    push(`${PATH_NAME.categorysEdit}/${category._id}`)
                  }
                  className="!rounded-md w-full !min-w-max cursor-wait"
                />
                <ButtonPrimary
                  title="Delete"
                  type="button"
                  onClick={() => deleteCategory(category._id)}
                  className="!rounded-md w-full !min-w-max !bg-bgDelete"
                />
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {dataCategorys && dataCategorys.length && (
        <NoDataPage className="-mt-20" />
      )}

      {dataPaginate && (
        <Paginate
          onChange={setPage}
          limit={dataPaginate.limit}
          totalPage={dataPaginate.totalPage}
        />
      )}
    </Box>
  )
}

export default memo(Categorys)
