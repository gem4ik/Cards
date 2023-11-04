import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import s from './decks.module.scss'

import { Trash } from '@/assets'
import {
  Button,
  Column,
  Pagination,
  RangeSlider,
  Sort,
  TabSwitcher,
  Textfield,
  Typography,
} from '@/components'
import { AddNewPack } from '@/pages'
import { PacksTable } from '@/pages/Decks/PacksTable/PacksTable.tsx'
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
  const rangeValue = useSelector<RootState, Array<string>>(state => state.app.rangeValue)
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
  const rangeOptions = [0, data?.maxCardsCount ? data?.maxCardsCount : 20]
  const clearFilters = () => {
    dispatch(appActions.setRangeValue(['0', '10']))
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
    },
  ]

  return (
    <div className={s.packlistWrapper}>
      <div className={s.packlistSection}>
        <Typography variant={'large'}>Packs list</Typography>
        <AddNewPack />
      </div>
      <div className={s.filterWrapper}>
        <Textfield
          value={searchName}
          className={s.searchInput}
          placeholder={`Search By Deck's name`}
          type={'search'}
          onChangeText={value => dispatch(appActions.setSearchName(value))}
        />
        <div>
          <Typography variant={'body2'}>Show packs cards</Typography>
          <TabSwitcher
            values={['My Cards', 'All Cards']}
            onValueChange={value => dispatch(appActions.setAuthor(value))}
          />
        </div>
        <div>
          <Typography variant={'body2'}>Number of cards</Typography>
          <RangeSlider
            range={rangeOptions}
            onChange={values => dispatch(appActions.setRangeValue(values))}
          ></RangeSlider>
        </div>
        <Button variant={'secondary'} onClick={clearFilters}>
          {<Trash />}Clear Filter
        </Button>
      </div>
      <PacksTable columns={columns} sort={sort} items={data?.items} removeDecks={removeDecks} />
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
