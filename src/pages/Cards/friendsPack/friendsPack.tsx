import { useState } from 'react'

import moment from 'moment'
import { Link } from 'react-router-dom'

import s from './friendsPack.module.scss'

import { BackArrow, CardsItems, Pencil, Trash } from '@/assets'
import { Button, Column, Sort, Table, TableRoot, Textfield, Typography } from '@/components'
import f from '@/pages/Cards/myPacks/myPacks.module.scss'
import { useGetCardsByIdQuery, useRemoveDeckMutation } from '@/services'

type Props = {
  decksId?: string
}

export const FriendsPack = (props: Props) => {
  const { data } = props.decksId && useGetCardsByIdQuery(props.decksId)
  const [removeDecks] = useRemoveDeckMutation()
  const [sort, setSort] = useState<Sort>({ key: 'cardsCount', direction: 'asc' })
  const columns: Column[] = [
    {
      key: 'question',
      title: 'Question',
      sortable: true,
    },
    {
      key: 'answer',
      title: 'Answer',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
    },
    {
      key: 'grade',
      title: 'Grade',
      sortable: true,
    },
  ]

  return (
    <div className={s.myPacksWrapper}>
      <Link to={'/'} className={s.backToList}>
        <BackArrow />
        <Typography style={{ marginLeft: '5px' }} variant={'body2'}>
          Back to Packs List
        </Typography>
      </Link>
      <div className={s.myPackHeading}>
        <Typography variant={'h1'}>{`${'Friend'}'${'s Pack'}`}</Typography>
        <Button>Learn To Pack</Button>
      </div>
      <Textfield
        className={f.searchDeck}
        fullWidth={true}
        type={'search'}
        placeholder={'Input search'}
      />
      <div className={s.table}>
        <TableRoot>
          <Table.Header columns={columns} sort={sort} onSort={setSort} />
          <Table.Tbody>
            {data?.items.map((el: CardsItems) => (
              <Table.Row key={el.id}>
                <Table.Cell>{el.question}</Table.Cell>
                <Table.Cell>{el.answer}</Table.Cell>
                <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{el.rating}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </TableRoot>
      </div>
    </div>
  )
}
