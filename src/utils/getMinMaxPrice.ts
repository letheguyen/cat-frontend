import { DetailSizeTypeRes } from '@/interfaces'

export const getMinMaxPrice = (dataPrice: DetailSizeTypeRes[]) => {
  const arrayPrice = dataPrice.map((data) => data.price).sort((a, b) => a - b)

  const min = arrayPrice?.[0]?.toLocaleString()
  const max = arrayPrice?.[arrayPrice?.length - 1]?.toLocaleString()
  return { min, max }
}
