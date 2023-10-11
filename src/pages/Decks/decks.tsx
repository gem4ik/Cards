import { useEffect, useState } from 'react'

import moment from 'moment'
import { useDispatch } from 'react-redux'

import s from './decks.module.scss'

import { Pencil } from '@/assets/components/decksTable/pencil.tsx'
import { Play } from '@/assets/components/decksTable/play.tsx'
import { Trash } from '@/assets/components/decksTable/trash.tsx'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { RangeSlider } from '@/components/ui/slider'
import { Column, Sort, Table, TableRoot } from '@/components/ui/table/table.tsx'
import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'
import { Textfield } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { AddNewPack } from '@/pages/Decks/addNewPack/addNewPack.tsx'
import { appActions } from '@/services/appSlice.tsx'
import { useGetMeQuery } from '@/services/AuthAPI.ts'
import { useGetDecksQuery, useRemoveDeckMutation } from '@/services/DecksAPI.ts'

export const Decks = () => {
  const dispatch = useDispatch()
  const { data: getMeData } = useGetMeQuery()
  const [sort, setSort] = useState<Sort>({ key: 'cardsCount', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const [rangeValues, setRangeValues] = useState(['0', '10'])
  const [SearchName, setSearchName] = useState('')
  const [author, setAuthor] = useState('')
  const [removeDecks] = useRemoveDeckMutation()
  const sortString = sort ? `${sort.key}-${sort.direction}` : null

  const searchParams = {
    currentPage: currentPage,
    itemsPerPage: +itemsPerPage,
    orderBy: sortString,
    maxCardsCount: rangeValues[1],
    minCardsCount: rangeValues[0],
    name: SearchName,
    authorId: author === 'My Cards' ? getMeData?.id : '',
  }
  const { data } = useGetDecksQuery(searchParams)
  const rangeOptions = [0, data?.maxCardsCount ? data?.maxCardsCount : 20]
  const clearFilters = () => {
    setRangeValues(['0', '10'])
    setCurrentPage(1)
    setItemsPerPage('10')
    setRangeValues(['0', '10'])
    setSearchName('')
    setAuthor('')
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
          value={SearchName}
          className={s.searchInput}
          placeholder={`Search By Deck's name`}
          type={'search'}
          onChangeText={setSearchName}
        ></Textfield>
        <div>
          <Typography variant={'body2'}>Show packs cards</Typography>
          <TabSwitcher
            values={['My Cards', 'All Cards']}
            onValueChange={value => setAuthor(value)}
          />
        </div>
        <div>
          <Typography variant={'body2'}>Number of cards</Typography>
          <RangeSlider
            range={rangeOptions}
            onChange={values => setRangeValues(values)}
          ></RangeSlider>
        </div>
        <Button variant={'secondary'} onClick={clearFilters}>
          {<Trash />}Clear Filter
        </Button>
      </div>
      <div className={s.tableWrapper}>
        <TableRoot>
          <Table.Header columns={columns} sort={sort} onSort={setSort} />
          <Table.Tbody>
            {data?.items?.map(el => (
              <Table.Row key={el.id}>
                <Table.Cell>{el.name}</Table.Cell>
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
        onPageChange={setCurrentPage}
        totalCount={data?.pagination?.totalPages || 1}
        siblingCount={1}
        currentPage={data?.pagination?.currentPage || 1}
        pageSize={data?.pagination?.itemsPerPage || 10}
        className={''}
        onPageSizeChange={setItemsPerPage}
      />
    </div>
  )
}
