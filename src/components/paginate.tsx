import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'

import { IPaginationsPage } from '@/interfaces'

const Paginate: React.FC<IPaginationsPage> = ({
  limit,
  onChange,
  totalPage,
}) => {
  const onChangePage = (page: number) => {
    onChange?.(page + 1)
  }

  return (
    <>
      {totalPage / limit >= 2 && (
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
