import { LIMIT_PAGE } from '@/constants'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useQuery = () => {
  const { query } = useRouter()
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (query.page && Number(query.page)) {
      setPage(Number(query.page))
    }
  }, [query.page])

  return { page, allData: { page, limit: LIMIT_PAGE } }
}
