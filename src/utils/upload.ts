import { IUpload } from '@/interfaces'
import { uploadFile } from '@/services'

export const handleGetUrlImage = async (file: File | undefined) => {
  const dataResponse: IUpload = {
    isError: false,
    imageURl: undefined,
  }
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    const imageUrl = (await uploadFile(formData)) as string | undefined

    console.log(imageUrl)

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
