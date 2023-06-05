export const CODE_ERROR = {
  EXISTS: 1,
  SUCCESS: 2,
  NO_DATA: 3,
  UPDATE_SUCCESS: 4,
  ACTION_FAILURE: 5,
  SERVER: 9999,
} as const

export const RESPONSE_DATA = {
  [CODE_ERROR.SUCCESS]: 'success',
  [CODE_ERROR.NO_DATA]: 'not found',
  [CODE_ERROR.EXISTS]: 'already exists',
  [CODE_ERROR.SERVER]: 'Something went wrong',
  [CODE_ERROR.UPDATE_SUCCESS]: 'Update success',
  [CODE_ERROR.ACTION_FAILURE]: 'Execute request failure',
}
