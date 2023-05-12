import { IUpload } from '@/interfaces'
import { uploadFile } from '@/services'

export const handleGetUrlImage = async (file: File | undefined | string) => {
  const dataResponse: IUpload = {
    isError: null,
    imageURl: undefined,
  }
  if (file instanceof File) {
    const formData = new FormData()
    formData.append('file', file)
    const imageUrl = (await uploadFile(formData)) as string | undefined

    if (imageUrl) {
      dataResponse.imageURl = imageUrl
      dataResponse.isError = false
    } else {
      dataResponse.imageURl = undefined
      dataResponse.isError = true
    }
  }
  return dataResponse
}
