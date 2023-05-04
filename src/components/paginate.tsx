import { IPaginationsPage } from '@/interfaces'
import React, { memo } from 'react'
import ReactPaginate from 'react-paginate'

const Paginate: React.FC<IPaginationsPage> = ({
  onChange,
  totalPage,
  limit,
}) => {
  const onChangePage = (page: number) => {
    onChange?.(page + 1)
  }

  return (
    <ReactPaginate
      previousLabel={'<<'}
      nextLabel={'>>'}
      pageCount={Math.ceil(totalPage / limit)}
      onPageChange={(page) => onChangePage(page.selected)}
      containerClassName={'custom-paginate'}
      disabledClassName={'opacity-40'}
      activeClassName={'bg-[var(--primary-color)] rounded-md text-white'}
    />
  )
}

export default memo(Paginate)
