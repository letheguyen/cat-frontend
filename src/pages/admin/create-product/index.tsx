import { HeadingTitle } from '@/components'
import { IDetailCategory, IResponCategory } from '@/interfaces'
import { getCategorys } from '@/services'
import { Box, Text } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'

const CreateProduct = () => {
  const [dataCategory, setDataCategory] = useState<IDetailCategory[] | null>()

  const handleGetAllCategory = async () => {
    const res: IResponCategory | null = await getCategorys()
    if (res?.data) {
      setDataCategory(res.data)
    }
  }

  useEffect(() => {
    handleGetAllCategory()
  }, [])

  return (
    <form>
      <HeadingTitle title="Create Product" />
      <Box className="flex flex-col mt-4">
        <Text>
          Select category
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <select name="cars" id="cars" className="input-base-select">
          <option value="">--Select category--</option>
          {dataCategory?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </Box>
    </form>
  )
}

export default memo(CreateProduct)
