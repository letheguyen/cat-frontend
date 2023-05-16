import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'

import { IPaginationsPage } from '@/interfaces'
import { useRouter } from 'next/router'

const Paginate: React.FC<IPaginationsPage> = ({ limit, totalPage }) => {
  const { push, asPath, pathname } = useRouter()

  const onChangePage = (page: number) => {
    push({
      pathname,
      query: { page: page + 1 },
    })
  }

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
          activeClassName={'bg-colorPrimary rounded-md text-white'}
        />
      )}
    </>
  )
}

export default memo(Paginate)
