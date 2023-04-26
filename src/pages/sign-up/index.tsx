import React from 'react'

import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { schemaSignUp } from '@/schema'
import { DataPostSignUp, TypeFormSignUp } from '@/interfaces'
import { ButtonPrimary } from '@/components'
import { TYPE_FILE_SUPPORT } from '@/constants'
// import FileUpload from '@/components/UploadFile'

const SignUp = () => {
  const {
    getValues,
    setValue,
    register,
    setError,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<TypeFormSignUp>({
    resolver: yupResolver(schemaSignUp),
  })

  const onSubmit = (data: TypeFormSignUp) => {
    let dataSignUp: any

    if (data.avatar) {
      dataSignUp = { ...data, ...dataSignUp, avatar: data.avatar[0] }
    }
    if (data.background) {
      dataSignUp = { ...data, ...dataSignUp, background: data.background[0] }
    }

    console.log(dataSignUp)
  }

  return (
    <div className="main-content">
      SignUp
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p>User name</p>
          <input type="text" {...register('userName')} />
          <span className="text-red-600">{errors.userName?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>E-mail</p>
          <input type="text" {...register('email')} />
          <span className="text-red-600">{errors.email?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>Password</p>
          <input type="text" {...register('password')} />
          <span className="text-red-600">{errors.password?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>Age</p>
          <input type="number" {...register('age')} />
          <span className="text-red-600">{errors.age?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>Address</p>
          <input type="text" {...register('address')} />
          <span className="text-red-600">{errors.address?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>Avatar</p>
          <input
            type="file"
            accept={TYPE_FILE_SUPPORT.toString()}
            {...register('avatar')}
          />
          <span className="text-red-600">{errors.avatar?.message}</span>
        </div>

        <div className="flex flex-col">
          <p>backgroud</p>
          <input
            type="file"
            accept={TYPE_FILE_SUPPORT.toString()}
            {...register('background')}
          />
          <span className="text-red-600">{errors.background?.message}</span>
        </div>

        {/* <FileUpload /> */}

        <ButtonPrimary type="submit" title="Submit" />
      </form>
    </div>
  )
}

export default SignUp
