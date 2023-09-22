import s from './pagination.module.scss'

import { DOTS, usePagination } from '@/components/ui/pagination/usePagination.tsx'

type PaginationProps = {
  onPageChange: (nextPage: number) => void
  totalCount: number
  siblingCount: number
  currentPage: number
  pageSize: number
  className: string
}

export const Pagination = (props: PaginationProps) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props
  //определяем в переменную !!!!!!!!!!пока непонятно что!!!!!!!!!!!!!!!
  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })

  //если в paginationRange меньше двух страниц то отрисовывать пагинацию не будем
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null
  }
  //определяем действия при переключении страниц
  const nextPageButtonHandel = () => {
    onPageChange(currentPage + 1)
  }
  const PreviousPageButtonHandel = () => {
    onPageChange(currentPage - 1)
  }
  //определяем последнюю страницу
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={`${s.paginationWrapper} ${s[className]}`}>
      {/*  кнопка prevPage */}
      <li
        className={`${s.pagination__item} ${currentPage === 1 ? s.disabled : ''}`}
        onClick={PreviousPageButtonHandel}
      >
        <div className={s.arrow__left} />
      </li>
      {paginationRange.map(pageNumber => {
        //если текущая страницы это точки, то отрисовываем их через юникод
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className={`${s.pagination__item} ${s.dots}`}>
              &#8230;
            </li>
          )
        }

        //отрисовывем пагинацию
        return (
          <li
            className={`${s.pagination__item} ${pageNumber === currentPage ? s.selected : ''}`}
            onClick={() => onPageChange(+pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  кнопка nextPage */}
      <li
        className={`${s.pagination__item} ${currentPage === lastPage ? s.disabled : ''}`}
        onClick={nextPageButtonHandel}
      >
        <div className={s.arrow__right} />
      </li>
      <span>показать</span>

      <span>на странице</span>
    </ul>
  )
}
