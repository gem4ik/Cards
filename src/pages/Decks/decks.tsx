import { useEffect } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import s from './decks.module.scss'

import { Pencil, Play, Trash } from '@/assets'
import {
  Button,
  Pagination,
  RangeSlider,
  Column,
  Table,
  TableRoot,
  TabSwitcher,
  Textfield,
  Typography,
  Sort,
} from '@/components'
import { AddNewPack } from '@/pages'
import {
  appActions,
  useGetMeQuery,
  useGetDecksQuery,
  useRemoveDeckMutation,
  RootState,
} from '@/services'

export const Decks = () => {
  const dispatch = useDispatch()
  const { data: getMeData } = useGetMeQuery()
  const authorFromState = useSelector<RootState, string>(state => state.app.author)
  const sortState = useSelector<RootState, Sort>(state => state.app.sort)
  const currentPageState = useSelector<RootState, number>(state => state.app.currentPage)
  const itemsPerPage = useSelector<RootState, number>(state => state.app.itemsPerPage)
  const rangeValue = useSelector<RootState, Array<string>>(state => state.app.rangeValue)
  const searchName = useSelector<RootState, string>(state => state.app.searchName)
  // const [SearchName, setSearchName] = useState('')
  const [removeDecks] = useRemoveDeckMutation()
  const sortString = sortState ? `${sortState.key}-${sortState.direction}` : null

  const searchParams = {
    currentPage: currentPageState,
    itemsPerPage: +itemsPerPage,
    orderBy: sortString,
    maxCardsCount: rangeValue[1],
    minCardsCount: rangeValue[0],
    name: searchName,
    authorId: authorFromState === 'My Cards' ? getMeData?.id : '',
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
  }, [currentPageState, itemsPerPage, sortString])

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
  const sortDecksHandler = (key: string, direction: 'asc' | 'desc') => {
    dispatch(appActions.setSort({ key, direction }))
  }

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
      <div className={s.tableWrapper}>
        <TableRoot>
          <Table.Header
            columns={columns}
            sort={sortState}
            onSort={(sort: Sort) => {
              if (sort) {
                sortDecksHandler(sort.key, sort.direction)
              }
            }}
          />
          <Table.Tbody>
            {data?.items?.map(el => (
              <Table.Row key={el.id}>
                <Table.Cell>
                  <Link to={'cards'} state={{ authorId: el.author.id, decksId: el.id }}>
                    {el.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{el.cardsCount}</Table.Cell>
                <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{el.author.name}</Table.Cell>
                <Table.Cell>
                  <div className={s.icons}>
                    <Trash callBack={() => removeDecks(el.id)} />
                    <Play />
                    <Pencil />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </TableRoot>
      </div>
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
