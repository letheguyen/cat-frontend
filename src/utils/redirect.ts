export const handleParseUrl = (object: any) => {
  return Object.keys(object).map(key => object[key])
}