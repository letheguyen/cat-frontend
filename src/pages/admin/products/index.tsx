import React, { useCallback, useEffect, useState } from 'react'
import { FitlImage, HeadingTitle, NoDataPage } from '@/components'
import Paginate from '@/components/paginate'
import {
  FAVORITE_LIKES,
  LIMIT_PAGE,
  MODAL_TYPE,
  STATUS_CATEGORY,
} from '@/constants'
import { useQuery } from '@/hooks'
import { IDataProducts, IPagination } from '@/interfaces'
import { getProduct } from '@/services'
import { Box, Text } from '@chakra-ui/react'
import { useStore } from '@/store'
import { getMinMaxPrice } from '@/utils'
import { TruckIcon } from '@/icons'
import clsx from 'clsx'

const Products = () => {
  const { setDataModal, setLoading } = useStore()
  const [products, setProducts] = useState<IDataProducts[]>()
  const [dataPaginate, setDataPaginate] = useState<IPagination>()

  // Custom hook
  const { page, allData } = useQuery()

  // get data product
  const handleGetProduct = useCallback(async () => {
    setLoading(true)
    const data = await getProduct(allData)
    if (data) {
      setDataPaginate(data?.pagination)
      setProducts(data?.data)
    }
    setTimeout(() => setLoading(false), 600)
    // eslint-disable-next-line
  }, [page])

  // Effect
  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  console.log(products)

  return (
    <Box className="h-full">
      <HeadingTitle title="Products" />

      <Box className="grid grid-cols-4 gap-4 mt-3 max-xl:grid-cols-3 max-lg:grid-cols-2">
        {products?.map((product, index) => (
          <Box
            key={product._id}
            bg="backgroundItem"
            borderRadius="item"
            // opacity={product.status === STATUS_CATEGORY.pause ? '0.8' : ''}
            className="blockItem"
          >
            <FitlImage
              height="100%"
              url={product.images?.[0]?.image}
              className='border'
            >
              <>
                {product.likes >= FAVORITE_LIKES && (
                  <Box className="favoriteLabel">Yêu thích +</Box>
                )}
                {product.status === STATUS_CATEGORY.pause && (
                  <Box className="bg-black bg-opacity-80 text-white positionsCenter whitespace-nowrap py-2 px-3">
                    Ngừng kinh doanh
                  </Box>
                )}
              </>
            </FitlImage>

            <Text as="span" className="line-clamp-2 leading-5 h-10 mb-2 mt-1">
              {product.title}
            </Text>
            <Box className="flex text-sm">
              <Text as="span" className="mr-1">
                Giá :
              </Text>
              <Text as="span" className="text-colorPrimary">
                {getMinMaxPrice(product.detailSizeType)?.min}đ
              </Text>
              <Text as="span" className="px-1 opacity-80">
                to
              </Text>
              <Text as="span" className="text-colorPrimary">
                {getMinMaxPrice(product.detailSizeType)?.max}đ
              </Text>
            </Box>

            <Box className="flex flex-wrap">
              <Text as="span" className="text-sm">
                Likes:{' '}
                <Text as="span" className="text-colorPrimary">
                  {product.likes}
                </Text>
              </Text>

              <Text as="span" className="text-sm ml-auto">
                Đã bán :{' '}
                <Text as="span" className="text-colorPrimary">
                  0
                </Text>
              </Text>
            </Box>
            <Text as="span" className="text-sm flexItem gap-2">
              <TruckIcon className="text-colorPrimary" width="18" height="18" />
              Toàn quốc
            </Text>
          </Box>
        ))}
      </Box>

      {!products?.length && <NoDataPage height="85%" className="-mt-20" />}

      {dataPaginate && (
        <Paginate
          limit={dataPaginate.limit || LIMIT_PAGE}
          totalPage={dataPaginate.totalPage}
        />
      )}
    </Box>
  )
}

export default Products
