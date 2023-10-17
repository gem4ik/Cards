import { Column, Sort, Table, TableRoot, Textfield } from '@/components'
import moment from 'moment/moment'
import s from '@/pages/Decks/decks.module.scss'
import { Pencil, Trash } from '@/assets'
import { FC, useState } from 'react'
import { useGetCardsByIdQuery, useRemoveDeckMutation } from '@/services'
import { AddNewCard } from '@/pages/Decks/myPacks/addNewCard/addNewCard.tsx'

type MyPacks = {
  decksId?: string
}

export const MyPacks: FC<MyPacks> = ({ decksId }) => {
  const { data: myPacks } = decksId && useGetCardsByIdQuery(decksId)

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
        <h1>My Pack</h1>
        <AddNewCard id={decksId} />
      </div>
      <Textfield />
      <TableRoot>
        <Table.Header columns={columns} sort={sort} onSort={setSort} />
        <Table.Tbody>
          {myPacks?.items.map(el => (
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
