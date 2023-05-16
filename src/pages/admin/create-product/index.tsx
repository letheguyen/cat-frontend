import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import React, { memo, useCallback, useEffect, useState } from 'react'

import {
  IResponCategory,
  IDetailCategory,
  IDataPostCreateProduct,
  ITypeUseFormCreateProduct,
} from '@/interfaces'
import { useStore } from '@/store'
import { CloseIcon } from '@/icons'
import { handleGetUrlImage } from '@/utils'
import { schemaCreateProduct } from '@/schema'
import { createProduct, getCategorys } from '@/services'
import { ButtonPrimary, FitlImage, HeadingTitle } from '@/components'
import { MAX_LENGTH_IAMGE, MODAL_TYPE, TYPE_FILE_SUPPORT } from '@/constants'

const dataImagesDefault = {
  image: undefined,
  attribute: '',
  detailSizeType: [
    {
      sizeAndType: '',
      quantity: 1,
    },
  ],
}

const dataAttributeDefault = { key: '', value: '' }

const CreateProduct = () => {
  const { back } = useRouter()
  const { setLoading, setDataModal } = useStore()
  const [dataCategory, setDataCategory] = useState<IDetailCategory[] | null>()

  const {
    setValue,
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ITypeUseFormCreateProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      images: [dataImagesDefault],
      attribute: [dataAttributeDefault],
    },
  })

  const { append: addNewImage } = useFieldArray({
    control,
    name: 'images',
  })

  const dataImages = useWatch({
    control,
    name: 'images',
  })

  const {
    append: addAtrribute,
    fields: fieldAtrribute,
    remove: clearAtrribute,
  } = useFieldArray({
    control,
    name: 'attribute',
  })

  const onSubmit = async (data: ITypeUseFormCreateProduct) => {
    setLoading(true)
    const { images } = data

    const dataImages = await Promise.all(
      images.map(async (image) => {
        const urlImage = await handleGetUrlImage(image.image?.[0])
        if (urlImage.imageURl) {
          return { ...image, image: urlImage.imageURl }
        } else {
          return undefined
        }
      })
    )

    if (dataImages.includes(undefined)) {
      setLoading(false)
      setDataModal({
        messageModal: 'Upload image failure',
        modalKey: MODAL_TYPE.commonError,
      })
    } else {
      const newData = {
        ...data,
        images: dataImages,
      } as IDataPostCreateProduct

      const res = await createProduct(newData)
      console.log(res)
    }
    setLoading(false)
  }

  const handleGetAllCategory = useCallback(async () => {
    const res: IResponCategory | null = await getCategorys()
    if (!res?.data) return
    setDataCategory(res.data)
  }, [])

  const removeImage = useCallback((i: number) => {
    const newDataImages = getValues('images')?.filter((_, index) => index !== i)
    setValue('images', newDataImages)
    // eslint-disable-next-line
  }, [])

  const clearAtrributeImage = useCallback((dadindex: number, i: number) => {
    const detailSizeType = getValues().images[dadindex].detailSizeType
    const newDetailSizeType = detailSizeType.filter((_, index) => index !== i)
    setValue(`images.${dadindex}.detailSizeType`, newDetailSizeType)
    // eslint-disable-next-line
  }, [])

  const renderError = (dadindex: number, i: number) => {
    return errors.images?.[dadindex]?.detailSizeType?.[i]
  }

  const handleAddAtrribute = useCallback((type?: string) => {
    switch (type) {
      case 'ATRRIBUTE':
        return addAtrribute(dataAttributeDefault)
      case 'IMAGES':
        return addNewImage(dataImagesDefault)
    }
    // eslint-disable-next-line
  }, [])

  const handleAppendSizeOrType = useCallback((index: number) => {
    setValue(`images.${index}.detailSizeType`, [
      ...getValues().images[index].detailSizeType,
      {
        sizeAndType: '',
        quantity: 1,
      },
    ])
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    handleGetAllCategory()
    // eslint-disable-next-line
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="transition-all ease-in">
      <HeadingTitle title="Create Product" />

      <Box className="grid grid-cols-2 gap-4">
        <Box className="flex flex-col mt-4">
          <Text>
            Select category
            <Text as="span" color="colorFieldRequired" className="-mt-1">
              *
            </Text>
          </Text>
          <select
            id="cars"
            className="input-base-select"
            {...register('category')}
          >
            <option value="">--Select category--</option>
            {dataCategory?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          <Text as="span" color="colorMessageError">
            {errors.category?.message}
          </Text>
        </Box>

        <Box className="flex flex-col mt-4">
          <Text>
            Title
            <Text as="span" color="colorFieldRequired" className="-mt-1">
              *
            </Text>
          </Text>
          <input
            placeholder="Enter title"
            className="input-base"
            type="text"
            {...register('title')}
          />
          <Text as="span" color="colorMessageError">
            {errors.title?.message}
          </Text>
        </Box>
      </Box>

      <Box className="flex flex-col mt-4">
        <Text>
          Description
          <Text as="span" color="colorFieldRequired" className="-mt-1">
            *
          </Text>
        </Text>
        <textarea
          rows={14}
          cols={50}
          placeholder="Enter description"
          className="input-base !h-auto"
          {...register('description')}
        />
        <Text as="span" color="colorTextDescribe">
          Product description up to 16000 characters.
        </Text>
        <Text as="span" color="colorMessageError">
          {errors.description?.message}
        </Text>
      </Box>

      <Box className="mt-6">
        <Text className="">Attribute</Text>
        <Text as="span" color="colorTextDescribe">
          Enter an additional description for your product.
          <br />
          Information consists of two key and value values, a valid description
          is a description consisting of two identification fields.
        </Text>
        {fieldAtrribute.map((atrribute, i) => (
          <Box key={atrribute.id} className="flex gap-4 mt-3">
            <Box className="w-96">
              <Text>Key</Text>
              <input
                className="input-base w-full"
                placeholder="Enter key"
                {...register(`attribute.${i}.key`)}
              />
              <Text as="span" color="colorMessageError">
                {errors.attribute?.[i]?.key?.message}
              </Text>
            </Box>

            <Box className="flex-1">
              <Text>Value</Text>
              <Box className="flex flex-1 items-center">
                <input
                  className="input-base w-full"
                  placeholder="Enter value"
                  {...register(`attribute.${i}.value`)}
                />
                <CloseIcon
                  width="24"
                  height="24"
                  onClick={() => clearAtrribute(i)}
                  className="iconClose mr-2"
                />
              </Box>
              <Text as="span" color="colorMessageError">
                {errors.attribute?.[i]?.value?.message}
              </Text>
            </Box>
          </Box>
        ))}
        <ButtonPrimary
          type="button"
          buttonType="dotted"
          title="+ Add new attribute"
          className="!rounded-md mt-6 m-auto"
          onClick={() => handleAddAtrribute('ATRRIBUTE')}
        />
      </Box>

      <HeadingTitle className="mt-6" title="Other Values" />

      <Box className="grid grid-cols-3 flex-wrap gap-x-4 gap-y-20 max-xl:grid-cols-2">
        {dataImages?.map((fieldImage, index) => (
          <Box key={index} className="flex flex-col">
            <Box className="flexItem-between">
              <Text>
                Image
                <Text as="span" color="colorFieldRequired" className="-mt-1">
                  *
                </Text>
              </Text>

              {index > 0 && (
                <CloseIcon
                  width="22"
                  height="22"
                  onClick={() => removeImage(index)}
                  className="iconClose"
                />
              )}
            </Box>

            <Box className="w-full flexItem">
              <input
                multiple={false}
                type="file"
                accept={TYPE_FILE_SUPPORT.toString()}
                {...register(`images.${index}.image`)}
              />
            </Box>

            <FitlImage
              url={getValues(`images.${index}.image`)?.item(0)}
              className="rounded-md border border-borderItemColor mt-3"
            />

            <Text as="span" color="colorMessageError">
              {errors.images?.[index]?.image?.message}
            </Text>

            <Box className="mt-2">
              <Text>Attribute</Text>
              <input
                className="input-base w-full"
                placeholder="EX: pink"
                {...register(`images.${index}.attribute`)}
              />
            </Box>

            <Text as="span" color="colorMessageError">
              {errors.images?.[index]?.attribute?.message}
            </Text>

            {fieldImage.detailSizeType.map((_, i) => (
              <Box key={i}>
                <Box className="grid grid-cols-2 gap-2 mt-3">
                  <Box className="w-full">
                    <Text>
                      Size or Type
                      <Text
                        as="span"
                        color="colorFieldRequired"
                        className="-mt-1"
                      >
                        *
                      </Text>
                    </Text>
                    <input
                      className="input-base w-full"
                      placeholder="Ex: XXL"
                      {...register(
                        `images.${index}.detailSizeType.${i}.sizeAndType`
                      )}
                    />
                  </Box>

                  <Box className="w-full">
                    <Text>
                      Quantity
                      <Text
                        as="span"
                        color="colorFieldRequired"
                        className="-mt-1"
                      >
                        *
                      </Text>
                    </Text>

                    <Box className="flex flex-1 items-center">
                      <input
                        className="input-base w-full"
                        placeholder="Ex: 100"
                        type="number"
                        {...register(
                          `images.${index}.detailSizeType.${i}.quantity`
                        )}
                      />
                      <CloseIcon
                        width="16"
                        height="16"
                        onClick={() => i > 0 && clearAtrributeImage(index, i)}
                        className={clsx(i === 0 && 'opacity-30', 'iconClose')}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className="flex flex-col">
                  <Text as="span" color="colorMessageError">
                    {renderError(index, i)?.sizeAndType?.message}
                  </Text>
                  <Text as="span" color="colorMessageError">
                    {renderError(index, i)?.quantity?.message}
                  </Text>
                </Box>
              </Box>
            ))}

            <ButtonPrimary
              type="button"
              title="+ Add more"
              buttonType="dotted"
              onClick={() => handleAppendSizeOrType(index)}
              className="!rounded-md mt-6 mr-auto"
            />
          </Box>
        ))}
      </Box>

      <Box className="w-1/3 pr-2.5">
        <ButtonPrimary
          type="button"
          title="+ Add more image"
          buttonType="dotted"
          className="!rounded-md mt-6 w-full"
          onClick={() =>
            dataImages.length < MAX_LENGTH_IAMGE && handleAddAtrribute('IMAGES')
          }
        />
      </Box>

      <Text className="mt-5">
        Length Image :
        <Text as="span" className="text-colorPrimary text-2xl ml-2">
          {dataImages.length}
        </Text>
      </Text>

      <Box className="flex gap-4 mt-3">
        <ButtonPrimary
          className="!rounded-md mt-6"
          type="submit"
          title="Create Project"
        />

        <ButtonPrimary
          onClick={back}
          className="!rounded-md mt-6"
          type="button"
          title="Back"
          buttonType="close"
        />
      </Box>
    </form>
  )
}

export default memo(CreateProduct)
