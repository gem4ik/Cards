import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import s from './decks.module.scss'

import { Column, Pagination, Sort, Typography } from '@/components'
import { AddNewPack } from '@/pages'
import { DecksFilter } from '@/pages/Decks/decksFilter/decksFilter.tsx'
import { DecksTable } from '@/pages/Decks/decksTable/DecksTable.tsx'
import {
  appActions,
  RootState,
  useGetDecksQuery,
  useGetMeQuery,
  useRemoveDeckMutation,
} from '@/services'

export const Decks = () => {
  const dispatch = useDispatch()
  const { data: getMeData } = useGetMeQuery()
  const [removeDecks] = useRemoveDeckMutation()
  const author = useSelector<RootState, string>(state => state.app.author)
  const sort = useSelector<RootState, Sort>(state => state.app.sort)
  const currentPage = useSelector<RootState, number>(state => state.app.currentPage)
  const itemsPerPage = useSelector<RootState, number>(state => state.app.itemsPerPage)
  const rangeValue = useSelector<RootState, string[]>(state => state.app.rangeValue)
  const searchName = useSelector<RootState, string>(state => state.app.searchName)
  const sortString = sort ? `${sort.key}-${sort.direction}` : null

  const searchParams = {
    currentPage: currentPage,
    itemsPerPage: +itemsPerPage,
    orderBy: sortString,
    maxCardsCount: rangeValue[1],
    minCardsCount: rangeValue[0],
    name: searchName,
    authorId: author === 'My Cards' ? getMeData?.id : '',
  }

  const { data } = useGetDecksQuery(searchParams)
  const rangeOptions = [1, data?.maxCardsCount ? data?.maxCardsCount : 20]
  const clearFilters = () => {
    dispatch(appActions.setRangeValue(['1', '10']))
    dispatch(appActions.setCurrentPage(1))
    dispatch(appActions.setItemsPerPage('10'))
    dispatch(appActions.setSearchName(''))
    dispatch(appActions.setAuthor('All Cards'))
  }

  useEffect(() => {
    dispatch(appActions.setSearchParams(searchParams))
  }, [currentPage, itemsPerPage, sortString])

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'author.name',
      title: 'Author',
      sortable: true,
    },
    {
      key: 'actions',
      title: '',
      sortable: false,
    },
  ]

  return (
    <div className={s.packlistWrapper}>
      <div className={s.packlistSection}>
        <Typography variant={'large'}>Packs list</Typography>
        <AddNewPack />
      </div>
      <DecksFilter
        tabValue={author}
        searchName={searchName}
        rangeOptions={rangeOptions}
        clearFilters={clearFilters}
      />
      <DecksTable
        columns={columns}
        sort={sort}
        items={data?.items}
        removeDecks={removeDecks}
        myId={getMeData?.id}
      />
      <Pagination
        onPageChange={(nextPage: number) => {
          dispatch(appActions.setCurrentPage(nextPage))
        }}
        totalCount={data?.pagination?.totalPages || 1}
        siblingCount={1}
        currentPage={data?.pagination?.currentPage || 1}
        pageSize={data?.pagination?.itemsPerPage || 10}
        className={''}
        onPageSizeChange={pageSize => {
          dispatch(appActions.setItemsPerPage(pageSize))
        }}
      />
    </div>
  )
}
