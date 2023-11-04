import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Deck, Pencil, Play, Trash } from '@/assets'
import { Column, Sort, Table, TableRoot } from '@/components'
import s from '@/pages/Decks/decks.module.scss'
import { appActions } from '@/services'

type Props = {
  columns: Column[]
  sort: Sort
  items?: Deck[]
  removeDecks: (decksId: string) => void
}

export const PacksTable = (props: Props) => {
  const dispatch = useDispatch()

  return (
    <div className={s.tableWrapper}>
      <TableRoot>
        <Table.Header
          columns={props.columns}
          sort={props.sort}
          onSort={(sort: Sort) => {
            if (sort) dispatch(appActions.setSort({ key: sort.key, direction: sort.direction }))
          }}
        />
        <Table.Tbody>
          {props.items?.map(el => (
            <Table.Row key={el.id}>
              <Table.Cell>
                <Link to={'cards'} state={{ authorId: el.author.id, decksId: el.id }}>
                  {el.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{el.cardsCount}</Table.Cell>
              <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
              <Table.Cell>{el.author.name}</Table.Cell>
              <Table.Cell>
                <div className={s.icons}>
                  <Trash callBack={() => props.removeDecks(el.id)} />
                  <Play />
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
