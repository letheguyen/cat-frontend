import React, { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CloseIcon, DeleteIcon } from '@/icons'
import {
  CODE_ERROR,
  ERROR_DATA,
  MODAL_TYPE,
  PATH_NAME,
  TYPE_FILE_SUPPORT,
} from '@/constants'
import { ButtonPrimary, HeadingTitle } from '@/components'
import { schemaCreateCategory } from '@/schema'
import {
  IDataCreateCategory,
  IDataPostCreateCategory,
  TypeFormCreateCategory,
} from '@/interfaces'
import { handleGetUrlImage as saveImage } from '@/utils'

import noImage from '/public/noImage.png'
import { useStore } from '@/store'
import { createCategory } from '@/services'

const CreateCategory = () => {
  const { push } = useRouter()
  const { setLoading, setDataModal, closeModal } = useStore()
  const [avatarPewview, setAvatarPewview] = useState<File>()
  const [backgroudPewview, setBackgroudPewview] = useState<File>()

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    resetField,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<IDataCreateCategory>({
    resolver: yupResolver(schemaCreateCategory),
    defaultValues: {
      attribute: [
        {
          key: '',
          value: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attribute',
  })

  const onSubmit = async (data: IDataCreateCategory) => {
    setLoading(true)
    console.log(data)

    const { isError: isErr, imageURl: url } = await saveImage(data.avatar[0])
    const { isError, imageURl } = await saveImage(data.background[0])

    if (isErr || isError) {
      handleUploadFailure()
    }

    if (url && imageURl) {
      const dataCreateCategory: IDataPostCreateCategory = {
        ...data,
        avatar: url,
        background: imageURl,
      }
      const res = await createCategory(dataCreateCategory)
      setLoading(null)

      if (res.errorCode === CODE_ERROR.SUCCESS) {
        setDataModal({
          messageModal: 'Create category ' + ERROR_DATA[res.errorCode],
          showModal: true,
          modalKey: MODAL_TYPE.commonSuccess,
        })

        setTimeout(() => {
          closeModal()
          // push(PATH_NAME.signIn)
        }, 5000)
      } else {
        setDataModal({
          messageModal: 'Category ' + ERROR_DATA[res.errorCode],
          showModal: true,
          modalKey: MODAL_TYPE.commonError,
        })
      }
    }
  }

  const handleClearValueImage = (type: string) => {
    if (type === 'AVATAR') {
      setAvatarPewview(undefined)
      resetField('avatar')
    } else {
      setBackgroudPewview(undefined)
      resetField('background')
    }
  }

  const handleUploadFailure = () => {
    setDataModal({
      messageModal: 'Upload image failure',
      showModal: true,
      modalKey: MODAL_TYPE.commonError,
    })
  }

  const appendAttribute = () => {
    append({
      key: '',
      value: '',
    })

    setDataModal({
      messageModal: 'Create category  success',
      showModal: true,
      modalKey: MODAL_TYPE.commonSuccess,
    })
  }

  useEffect(() => {
    const file = getValues('avatar')?.item(0)
    if (file) {
      setAvatarPewview(file)
    }
  }, [watch('avatar')])

  useEffect(() => {
    const file = getValues('background')?.item(0)
    if (file) {
      setBackgroudPewview(file)
    }
  }, [watch('background')])

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <HeadingTitle title="Create Product Catalog" />
      <div className="flex flex-col mt-4">
        <p>
          Title
          <span className="text-[var(--color-field-required)] -mt-1">*</span>
        </p>
        <input
          placeholder="Enter title"
          className="input-base"
          type="text"
          {...register('title')}
        />
        <span className="text-[var(--color-message-error)]">
          {errors.title?.message}
        </span>
      </div>

      <div className="flex flex-col mt-4">
        <p>
          Description
          <span className="text-[var(--color-field-required)] -mt-1">*</span>
        </p>
        <textarea
          rows={8}
          cols={50}
          placeholder="Enter description"
          className="input-base !h-auto"
          {...register('description')}
        />
        <span className="text-[var(--des-color)]">
          Description of catalog information up to 500 characters
        </span>
        <span className="text-[var(--color-message-error)]">
          {errors.description?.message}
        </span>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col mt-4 w-1/4">
          <p>
            Avatar
            <span className="text-[var(--color-field-required)] -mt-1">*</span>
          </p>

          <div className="w-full flex items-center">
            <input
              multiple={false}
              type="file"
              accept={TYPE_FILE_SUPPORT.toString()}
              {...register('avatar')}
            />
            {avatarPewview && (
              <DeleteIcon
                onClick={() => handleClearValueImage('AVATAR')}
                width="30"
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-[2px] hover:text-[var(--primary-color)] hover:opacity-100"
              />
            )}
          </div>
          <div
            className="mt-3 w-full pt-[100%] bg-cover cursor-pointer overflow-hidden border border-[var(--border-input-base)] relative rounded-md"
            style={{
              backgroundImage: avatarPewview
                ? 'url(' + URL.createObjectURL(avatarPewview) + ')'
                : 'url(' + noImage.src + ')',
              backgroundPosition: 'center',
            }}
          ></div>

          <span className="text-[var(--color-message-error)]">
            {errors.avatar?.message}
          </span>
        </div>

        <div className="flex flex-col mt-4 flex-1">
          <p>
            Backgroud
            <span className="text-[var(--color-field-required)] -mt-1">*</span>
          </p>
          <div className="w-full flex items-center">
            <input
              type="file"
              multiple={false}
              accept={TYPE_FILE_SUPPORT.toString()}
              {...register('background')}
            />
            {backgroudPewview && (
              <DeleteIcon
                onClick={() => handleClearValueImage('BACKGROUND')}
                width="30"
                className="pl-1 cursor-pointer opacity-60 hover:-translate-y-[2px] hover:text-[var(--primary-color)] hover:opacity-100"
              />
            )}
          </div>

          <div
            className="mt-3 w-full h-full  bg-cover cursor-pointer overflow-hidden border border-[var(--border-input-base)] relative rounded-md"
            style={{
              backgroundImage: backgroudPewview
                ? 'url(' + URL.createObjectURL(backgroudPewview) + ')'
                : 'url(' + noImage.src + ')',
              backgroundPosition: 'center',
            }}
          ></div>
          <span className="text-[var(--color-message-error)]">
            {errors.background?.message}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <p className="">Attribute</p>
        <span className="text-[var(--des-color)]">
          Enter an additional description for the catalog of goods.
          <br /> Information includes 2 key and value values, a valid
          description is a description that includes all 2 specified information
          fields.
        </span>
        {fields.map((_, i) => (
          <div key={i} className="flex gap-4 mt-3">
            <div className="w-96">
              <p>Key</p>
              <input
                className="input-base w-full"
                placeholder="Enter key"
                {...register(`attribute.${i}.key`)}
              />
              <span className="text-[var(--color-message-error)]">
                {errors.attribute?.[i]?.key?.message}
              </span>
            </div>

            <div className="flex-1">
              <p>Value</p>
              <div className="flex flex-1 items-center">
                <input
                  className="input-base w-full"
                  placeholder="Enter value"
                  {...register(`attribute.${i}.value`)}
                />
                <CloseIcon
                  onClick={() => remove(i)}
                  width="24"
                  height="24"
                  color="var(--primary-color)"
                  className="rotate-90 w-12 mr-2 cursor-pointer ml-2 max-sm:w-6 max-sm:mt-0 transition-all ease-in hover:cursor-pointer hover:scale-110 "
                />
              </div>
              <span className="text-[var(--color-message-error)]">
                {errors.attribute?.[i]?.value?.message}
              </span>
            </div>
          </div>
        ))}
        <ButtonPrimary
          onClick={appendAttribute}
          className="!rounded-md mt-6 m-auto"
          type="button"
          title="+ Add new attribute"
        />
      </div>

      <div className="flex gap-4 mt-3">
        <ButtonPrimary
          className="!rounded-md mt-6"
          type="submit"
          title="Create Category"
        />

        <ButtonPrimary
          onClick={() => push(PATH_NAME.home)}
          className="!rounded-md mt-6"
          type="button"
          title="Back"
          buttonType="close"
        />
      </div>
    </form>
  )
}

export default memo(CreateCategory)
