import React, { useCallback, useEffect, useState } from 'react'
import { FitlImage, HeadingTitle, NoDataPage } from '@/components'
import Paginate from '@/components/paginate'
import { LIMIT_PAGE, MODAL_TYPE } from '@/constants'
import { useQuery } from '@/hooks'
import { IDataProducts, IPagination } from '@/interfaces'
import { getProduct } from '@/services'
import { Box, Text } from '@chakra-ui/react'
import { useStore } from '@/store'
import { getMinMaxPrice } from '@/utils'

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
            className="blockItem "
          >
            <FitlImage
              height="100%"
              url={product.images?.[0]?.image}
              className="border"
            />

            <Text className="">{product.title}</Text>
            <Box className="flex text-sm">
              <Text as="span" className="text-colorPrimary">
                {getMinMaxPrice(product.detailSizeType)?.min}đ
              </Text>
              <Text as="span" className="px-2 opacity-80">
                to
              </Text>
              <Text as="span" className="text-colorPrimary">
                {getMinMaxPrice(product.detailSizeType)?.max}đ
              </Text>
            </Box>
            <Text as="span" className="text-sm ml-auto">
              Đã bán :{' '}
              <Text as="span" className="text-colorPrimary">
                0
              </Text>
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
