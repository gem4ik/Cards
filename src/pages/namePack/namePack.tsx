import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import s from './namePack.module.scss'
import { BackArrow } from '@/assets/components/backArrow/backArrow.tsx'
import { Typography } from '@/components/ui/typography'
import { Textfield } from '@/components/ui/textfield'
import { Table } from '@/components/ui/table/table.tsx'
import { useGetDecksByIdQuery } from '@/services/DecksAPI.ts'
import moment from 'moment/moment'

export const NamePack = () => {
  const idCard = 'cln2zvdvf0pdxvo2qwlenj6st'
  const { data } = useGetDecksByIdQuery(idCard)
  console.log(data)

  const dataV = data?.items.map(el => {
    const formattedDate = moment(el.updated).format('DD.MM.YYYY')
    return (
      <Table.Row>
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
