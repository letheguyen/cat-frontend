import { ButtonPrimary, HeadingTitle, NoDataPage } from '@/components'
import FitlImage from '@/components/fitlImage'
import { LIMIT_PAGE, MODAL_TYPE } from '@/constants'
import { IDetailCategory, IResponCategory } from '@/interfaces'
import { getCategorys, deleteCategorys } from '@/services'
import { useStore } from '@/store'
import React, { useEffect, useState } from 'react'

const Categorys = () => {
  const { setLoading, setDataModal } = useStore()
  const [dataCategorys, setDataCategory] = useState<IDetailCategory[] | null>()
  const [page, setPage] = useState(1)

  const handleGetCategory = async () => {
    const data: IResponCategory | null = await getCategorys({
      page,
      limit: LIMIT_PAGE,
    })
    setDataCategory(data?.data)
  }

  const deleteCategory = async (id: string) => {
    setDataModal({
      messageModal: 'Confirm delete',
      showModal: true,
      modalKey: MODAL_TYPE.commonConfirm,
      onOk: () => confirmDelete(id),
    })
  }

  const confirmDelete = async (id: string) => {
    setLoading(true)
    const res = await deleteCategorys(id)
    setLoading(null)
    if (res) {
      await handleGetCategory()
      setDataModal({
        messageModal: 'Delete success',
        showModal: true,
        modalKey: MODAL_TYPE.commonSuccess,
      })
    } else {
      setDataModal({
        messageModal: 'Delete failed',
        showModal: true,
        modalKey: MODAL_TYPE.commonError,
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    handleGetCategory()
  }, [page])

  useEffect(() => {
    if (!dataCategorys) return
    setLoading(null)
  }, [dataCategorys])

  return (
    <div className='h-full'>
      <HeadingTitle title="Categorys" />
      <div className="grid grid-cols-4 gap-4 mt-3 max-2xl:grid-cols-3 max-lg:grid-cols-2">
        {dataCategorys?.map((category) => (
          <div
            key={category._id}
            className="border border-[var(--border-input-base)] rounded-lg p-4 transition-all ease-linear hover:shadow-lg hover:shadow-[var(--shadow-item)] hover:cursor-pointer hover:-translate-y-1"
          >
            <div key={category._id}>
              <FitlImage height="60%" url={category.background} />
              <div className="flex gap-3 items-center py-3">
                <FitlImage
                  url={category.avatar}
                  width="10%"
                  className="hover:scale-110 shadow-lg shadow-[var(--shadow-item)] rounded-full border-2 border-[var(--primary-color)]"
                />
                <p className="text-heading line-clamp-1">{category.title}</p>
              </div>
              <span className="text-des line-clamp-3 mb-3">
                {category.description}
              </span>
              <p>Product: 0</p>

              <div className="flex gap-4 mt-1">
                <ButtonPrimary
                  className="!rounded-md w-full"
                  type="button"
                  title="Update"
                />
                <ButtonPrimary
                  onClick={() => deleteCategory(category._id)}
                  className="!rounded-md w-full !bg-[var(--bg-delete)]"
                  type="button"
                  title="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
        {dataCategorys && dataCategorys.length === 0 ? <NoDataPage /> : ''}
    </div>
  )
}

export default Categorys
