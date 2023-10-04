import moment from 'moment'

import s from './packsList.module.scss'

import { Filters } from '@/assets/components/filters/filters.tsx'
import { Button } from '@/components/ui/button'
import { RangeSlider } from '@/components/ui/slider'
import { Table } from '@/components/ui/table/table.tsx'
import { TabSwitcher } from '@/components/ui/tabSwitcher/tabSwitcher.tsx'
import { Textfield } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'
import { useGetDecksQuery } from '@/services/DecksAPI.ts'

export const PacksList = () => {
  const { data } = useGetDecksQuery({})

  const dataV = data?.items.map(el => {
    const formattedDate = moment(el.updated).format('DD.MM.YYYY')

    return (
      <Table.Row key={el.id}>
        <Table.Cell>{el.name}</Table.Cell>
        <Table.Cell>{el.cardsCount}</Table.Cell>
        <Table.Cell>{formattedDate}</Table.Cell>
        <Table.Cell>{el.author.name}</Table.Cell>
        <Table.Cell>{<Filters />}</Table.Cell>
      </Table.Row>
    )
  })

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
          <RangeSlider></RangeSlider>
        </div>
        <Button variant={'secondary'}>{<Filters />}Clear Filter</Button>
      </div>
      <div className={s.tableWrapper}>
        <Table.Thead>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created by</Table.HeadCell>
            <Table.HeadCell>для иконок</Table.HeadCell>
          </Table.Row>
        </Table.Thead>
        <Table.Tbody>{dataV}</Table.Tbody>
      </div>
    </div>
  )
}
