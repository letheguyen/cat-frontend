import React, { memo, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { IPaginationsPage } from '@/interfaces'
import { useRouter } from 'next/router'

const Paginate: React.FC<IPaginationsPage> = ({ limit, totalPage }) => {
  const { push, pathname, query } = useRouter()
  const [defaultPage, setDefaultPage] = useState(1)

  const onChangePage = (page: number) => {
    push({
      pathname,
      query: { page: page + 1 },
    })
  }

  useEffect(() => {
    if (!query.page) return
    setDefaultPage(Number(query.page))
  }, [query.page])

  return (
    <>
      {totalPage / limit > 1 && (
        <ReactPaginate
          nextLabel={'>>'}
          previousLabel={'<<'}
          disabledClassName={'opacity-40'}
          containerClassName={'custom-paginate'}
          pageCount={Math.ceil(totalPage / limit)}
          onPageChange={(page) => onChangePage(page.selected)}
          forcePage={defaultPage - 1}
          activeClassName={'bg-colorPrimary rounded-md text-white'}
        />
      )}
    </>
  )
}

export default memo(Paginate)
