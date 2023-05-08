export const API_URL = {
  users: '/users',
  upload: '/upload',
  signUp: '/sign-up',
  signIn: '/sign-in',
  categorys: '/categorys',
  wards: '/wards/getByDistrict',
  districts: '/districts/getByProvince',
  provinces: '/provinces/getAll?limit=-1',
} as const