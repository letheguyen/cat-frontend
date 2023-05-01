import { API_URL } from '@/constants'
import { fetchProvinces } from '../axios'

export const getProvinces = async () => {
  try {
    const { data } = await fetchProvinces.get(API_URL.provinces)
    return data?.data?.data
  } catch (_) {
    return null
  }
}

export const getDistricts = async (provinceCode: string) => {
  try {
    const { data } = await fetchProvinces.get(
      `${API_URL.districts}?provinceCode=${provinceCode}&limit=-1`
    )
    return data?.data?.data
  } catch (_) {
    return null
  }
}

export const getWards = async (districtsCode: string) => {
  try {
    const { data } = await fetchProvinces.get(
      `${API_URL.wards}?districtCode=${districtsCode}&limit=-1`
    )
    return data?.data?.data
  } catch (_) {
    return null
  }
}
