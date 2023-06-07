export const API_URL = {
  users: '/users',
  upload: '/upload',
  signUp: '/sign-up',
  signIn: '/sign-in',
  signInSNS: '/sign-in-sns',
  categorys: '/categorys',
  product: '/product',
  shopInformation: '/shop-infomation',
  getShopInfo: '/shop-info',
  roomChat: '/chat-room',
  detailroomChat: '/chat-room/:id',
  socket: '/socket',

  // Empty
  wards: '/wards/getByDistrict',
  districts: '/districts/getByProvince',
  provinces: '/provinces/getAll?limit=-1',
} as const
