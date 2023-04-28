import React from 'react'

import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schemaSignUp } from '@/schema'
import { DataPostSignUp, TypeFormSignUp } from '@/interfaces'
import { ButtonPrimary } from '@/components'
import { MODAL_TYPE, TYPE_FILE_SUPPORT } from '@/constants'
import { signUp, uploadFile } from '@/services'
import { useStore } from '@/store'
// import FileUpload from '@/components/UploadFile'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeFormSignUp>({
    resolver: yupResolver(schemaSignUp),
  })

  const { setDataModal } = useStore()

  const onSubmit = async (data: TypeFormSignUp) => {
    let dataSignUp: any
    let avatar: null | string = null
    let background: null | string = null
    const formData = new FormData()

    if (data.avatar) {
      formData.append('file', data.avatar[0])
      avatar = await uploadFile(formData)
      if(!avatar) {
        handleUploadFailure()
      }
    }
    if (data.background) {
      formData.append('file', data.background[0])
      background = await uploadFile(formData)
      if(!background) {
        handleUploadFailure()
      }
      // if (image) {
      //   return (dataSignUp = { ...data, ...dataSignUp, background: image[0] })
      // }
    }

    console.log()
  }

  const handleUploadFailure = () =>
    setDataModal({
      messageModal: 'Upload image failure',
      showModal: true,
      modalKey: MODAL_TYPE.commonError,
    })

  return (
    <div className="main-content">
      SignUp
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p>User name</p>
          <input type="text" {...register('userName')} />
          <span className="text-[var(--color-message-error)]">
            {errors.userName?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>E-mail</p>
          <input type="text" {...register('email')} />
          <span className="text-[var(--color-message-error)]">
            {errors.email?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Password</p>
          <input type="text" {...register('password')} />
          <span className="text-[var(--color-message-error)]">
            {errors.password?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Age</p>
          <input type="number" {...register('age')} />
          <span className="text-[var(--color-message-error)]">
            {errors.age?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Address</p>
          <input type="text" {...register('address')} />
          <span className="text-[var(--color-message-error)]">
            {errors.address?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Avatar</p>
          <input
            type="file"
            accept={TYPE_FILE_SUPPORT.toString()}
            {...register('avatar')}
          />
          <span className="text-[var(--color-message-error)]">
            {errors.avatar?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <p>backgroud</p>
          <input
            type="file"
            accept={TYPE_FILE_SUPPORT.toString()}
            {...register('background')}
          />
          <span className="text-[var(--color-message-error)]">
            {errors.background?.message}
          </span>
        </div>

        {/* <FileUpload /> */}

        <ButtonPrimary type="submit" title="Submit" />
      </form>
    </div>
  )
}

export default SignUp
