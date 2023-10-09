import { useMemo } from 'react'
//-----------------------хук usePagination----------------
type usePaginationProps = {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}
export const DOTS = '...'

export const usePagination = (props: usePaginationProps) => {
  const { totalCount, pageSize, siblingCount = 1, currentPage } = props

  return useMemo(() => {
    //считаем количество страниц
    const totalPageCount = Math.ceil(totalCount / pageSize)
    //считаем минимальное количество отрисованных страниц
    const totalPageNumbers = siblingCount + 5

    //проверяем если количество страниц меньше, чем минимальное количество
    //отрисованных страниц, то диапазон показываемых страниц будет от первой до totalpagecount
    if (totalPageNumbers >= totalPageCount) {
      return pagesRange(1, totalPageCount)
    }
    //считаем количество соседей у текущей страницы(скорее страницы на которую мы нажимаем)
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
    //булевое значение определяющее надо липоказывать точки
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
    //определяем переменным значения первой и последней страницы
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    //подсчёт на случай когда слева точек не должно быть!!!!!!!!!!!!!!!!!!!!понять что за цифра 3!!!!!!!!!!!!!!!!!!!
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = pagesRange(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }
    //подсчёт на случай когда справа точек не должно быть
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = pagesRange(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }
    //подсчёт на случай когда с обоих сторон точки нужны
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = pagesRange(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])
}

//-----функция которая создаст массив цифр для отрисовки----

const pagesRange = (start: number, end: number) => {
  let length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}
//-----------------------------------------------------------
