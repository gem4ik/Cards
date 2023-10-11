import moment from 'moment/moment'

import s from './cards.module.scss'

import { BackArrow } from '@/assets'
import { Button, Table, Textfield, Typography } from '@/components'
import { useGetCardsByIdQuery } from '@/services'

export const Cards = () => {
  const idCard = 'cln2zvdvf0pdxvo2qwlenj6st'
  const { data } = useGetCardsByIdQuery(idCard)

  const dataV = data?.items.map(el => {
    const formattedDate = moment(el.updated).format('DD.MM.YYYY')

    return (
      <Table.Row key={el.id}>
        <Table.Cell>{el.question}</Table.Cell>
        <Table.Cell>{el.answer}</Table.Cell>
        <Table.Cell>{formattedDate}</Table.Cell>
        <Table.Cell>{el.grade}</Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div>
      <div className={s.packWrapper}>
        <div className={s.buttonWrapper}>
          <Button variant={'link'}>{<BackArrow />}Back to Packs List</Button>
        </div>
        <div>
          <Typography variant={'large'}>Friend’s Pack</Typography>
          <Button variant={'primary'}>Learn to Pack</Button>
          <Textfield type={'search'} placeholder={'Input search'} />
        </div>
      </div>
      <Table.Thead>
        <Table.Row>
          <Table.HeadCell>Question</Table.HeadCell>
          <Table.HeadCell>Answer</Table.HeadCell>
          <Table.HeadCell>Last Updated</Table.HeadCell>
          <Table.HeadCell>Grade</Table.HeadCell>
        </Table.Row>
      </Table.Thead>
      <Table.Tbody>{dataV}</Table.Tbody>
    </div>
  )
}
