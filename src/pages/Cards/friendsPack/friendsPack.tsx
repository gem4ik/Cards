import { useState } from 'react'

import moment from 'moment'

import { CardsItems, Pencil, Trash } from '@/assets'
import { Column, Sort, Table, TableRoot, Textfield } from '@/components'
import s from '@/pages/Decks/decks.module.scss'
import { useGetCardsByIdQuery, useRemoveDeckMutation } from '@/services'

type Props = {
  decksId?: string
}

export const FriendsPack = (props: Props) => {
  const { data: friendDecks } = props.decksId && useGetCardsByIdQuery(props.decksId)
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
    <div>
      <span>Back to Packs List</span>
      <div>
        <h1>Friend Pack</h1>
      </div>
      <Textfield />
      <TableRoot>
        <Table.Header columns={columns} sort={sort} onSort={setSort} />
        <Table.Tbody>
          {friendDecks?.items.map((el: CardsItems) => (
            <Table.Row key={el.id}>
              <Table.Cell>{el.question}</Table.Cell>
              <Table.Cell>{el.answer}</Table.Cell>
              <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
              <Table.Cell>{el.grade}</Table.Cell>
              <Table.Cell>
                <div className={s.icons}>
                  <Trash callBack={() => removeDecks(el.id)} />
                  <Pencil />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Tbody>
      </TableRoot>
    </div>
  )
}
