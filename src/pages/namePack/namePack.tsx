import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import s from './namePack.module.scss'
import { BackArrow } from '@/assets/components/backArrow/backArrow.tsx'
import { Typography } from '@/components/ui/typography'
import { Textfield } from '@/components/ui/textfield'
import { Table } from '@/components/ui/table/table.tsx'
import { useGetDecksByIdQuery } from '@/services/DecksAPI.ts'
import moment from 'moment/moment'
import { Filters } from '@/assets/components/filters/filters.tsx'

export const NamePack = () => {
  const { data } = useGetDecksByIdQuery(`cln2zvdvf0pdxvo2qwlenj6st`)
  console.log(data.items)
  // const cardsFriend = data.items

  const cardsFriend = data?.items.map(el => {
    const formattedDate = moment(el.updated).format('DD.MM.YYYY')
    return (
      <Table.Row>
        <Table.Cell>{el}</Table.Cell>
        <Table.Cell>{el.cardsCount}</Table.Cell>
        <Table.Cell>{formattedDate}</Table.Cell>
        <Table.Cell>{el.author.name}</Table.Cell>
        <Table.Cell>{<Filters />}</Table.Cell>
      </Table.Row>
    )
  })
  return (
    <div>
      <Header isAuth={true} />
      <div className={s.buttonWrapper}>
        <Button variant={'link'}>{<BackArrow />}Back to Packs List</Button>
      </div>
      <div>
        <Typography style={{ color: 'white' }} variant={'large'}>
          Friend’s Pack
        </Typography>
        <Button variant={'primary'}>Learn to Pack</Button>
        <Textfield type={'search'} placeholder={'Input search'} />
      </div>
      <Table.Thead>
        <Table.Row>
          <Table.HeadCell>Question</Table.HeadCell>
          <Table.HeadCell>Answer</Table.HeadCell>
          <Table.HeadCell>Last Updated</Table.HeadCell>
          <Table.HeadCell>Grade</Table.HeadCell>
        </Table.Row>
      </Table.Thead>
    </div>
  )
}
