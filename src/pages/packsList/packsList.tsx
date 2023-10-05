import moment from 'moment'

import s from './packsList.module.scss'

import { Filters } from '@/assets/components/filters/filters.tsx'
import { Button } from '@/components/ui/button'
import { RangeSlider } from '@/components/ui/slider'
import { Column, Sort, Table } from '@/components/ui/table/table.tsx'
import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'
import { Textfield } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/services/DecksAPI.ts'
import { useState } from 'react'

export const PacksList = () => {
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null
  console.log(sort)
  const { data } = useGetDecksQuery({ orderBy: sortString })

  // console.log(data)
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
        <Typography style={{ color: 'white' }} variant={'large'}>
          Packs list
        </Typography>
        <Button>Add New Pack</Button>
      </div>
      <div className={s.filterWrapper}>
        <Textfield placeholder={'Input Search'} type={'search'}></Textfield>
        <div>
          <Typography style={{ color: 'white' }} variant={'body2'}>
            Show packs cards
          </Typography>
          <TabSwitcher values={['My Cards', 'All Cards']} onValueChange={() => {}} />
        </div>
        <div>
          <Typography style={{ color: 'white' }} variant={'body2'}>
            Number of cards
          </Typography>
          <RangeSlider range={[1, 50]} onChange={() => {}}></RangeSlider>
        </div>
        <Button variant={'secondary'}>{<Filters />}Clear Filter</Button>
      </div>
      <div>
        <div>
          <Table.Header columns={columns} sort={sort} onSort={setSort} />
          <Table.Tbody>
            {data?.items?.map(el => (
              <Table.Row key={el.id}>
                <Table.Cell>{el.name}</Table.Cell>
                <Table.Cell>{el.cardsCount}</Table.Cell>
                <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{el.author.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </div>
      </div>
    </div>
  )
}
