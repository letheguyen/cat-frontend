import { HeadingTitle } from '@/components'
import { getProduct } from '@/services'
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const Products = () => {
  const handleGetProduct = async () => {
    const res = await getProduct()
    console.log(res)
  }

  useEffect(() => {
    handleGetProduct()
  }, [])

  return (
    <Box className="h-full">
      <HeadingTitle title="Products" />
    </Box>
  )
}

export default Products
