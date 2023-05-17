import { HeadingTitle } from '@/components'
import Paginate from '@/components/paginate'
import { LIMIT_PAGE } from '@/constants'
import { useQuery } from '@/hooks'
import {
  IDataPostCreateProduct,
  IPagination,
  IResponProduct,
} from '@/interfaces'
import { getProduct } from '@/services'
import { Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState<IDataPostCreateProduct[]>()
  const [dataPaginate, setDataPaginate] = useState<IPagination>()

  // Custom hook
  const { page, allData } = useQuery()

  const handleGetProduct = useCallback(async () => {
    const data: IResponProduct | null = await getProduct(allData)
    setDataPaginate(data?.pagination)
    setProducts(data?.data)
  }, [page])

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  console.log(products)

  return (
    <Box className="h-full">
      <HeadingTitle title="Products" />

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
