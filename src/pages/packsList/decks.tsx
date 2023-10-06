import { useState } from 'react'

import moment from 'moment'

import s from './decks.module.scss'

import { Pencil } from '@/assets/components/decksTable/pencil.tsx'
import { Play } from '@/assets/components/decksTable/play.tsx'
import { Trash } from '@/assets/components/decksTable/trash.tsx'
import { Button } from '@/components/ui/button'
import { RangeSlider } from '@/components/ui/slider'
import { Column, Sort, Table, TableRoot } from '@/components/ui/table/table.tsx'
import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'
import { Textfield } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/services/DecksAPI.ts'

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ key: 'cardsCount', direction: 'asc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null

  const { data } = useGetDecksQuery({ orderBy: sortString })

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
        <Button>Add New Pack</Button>
      </div>
      <div className={s.filterWrapper}>
        <Textfield
          className={s.searchInput}
          placeholder={'Input Search'}
          type={'search'}
        ></Textfield>
        <div>
          <Typography variant={'body2'}>Show packs cards</Typography>
          <TabSwitcher values={['My Cards', 'All Cards']} onValueChange={() => {}} />
        </div>
        <div>
          <Typography variant={'body2'}>Number of cards</Typography>
          <RangeSlider range={[1, 50]} onChange={() => {}}></RangeSlider>
        </div>
        <Button variant={'secondary'}>{<Trash />}Clear Filter</Button>
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
                    <Trash />
                    <Play />
                    <Pencil />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </TableRoot>
      </div>
    </div>
  )
}
