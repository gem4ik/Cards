import { useState } from 'react'

import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import s from './DecksTable.module.scss'

import { Deck, Pencil, Play, Trash } from '@/assets'
import { Column, Sort, Table, TableRoot } from '@/components'
import { EditPack } from '@/pages/Cards/myPacks/editPack/editPack.tsx'
import { appActions } from '@/services'

type Props = {
  columns: Column[]
  sort: Sort
  items?: Deck[]
  removeDecks: (decksId: string) => void
  myId?: string
}

export const DecksTable = (props: Props) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  // const [chosenDeck, setChosenDeck] = useState<Deck | null>()
  const [deck, setDeck] = useState<Deck | null>(null)

  const setDecksParams = (value: boolean, deck: Deck) => {
    setOpen(value)
    setDeck(deck)
  }

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
                <Link
                  to={'cards'}
                  state={{ authorId: el.author.id, decksId: el.id }}
                  className={s.nameCell}
                >
                  {el.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{el.cardsCount}</Table.Cell>
              <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
              <Table.Cell>{el.author.name}</Table.Cell>
              <Table.Cell>
                {props.myId === el.author.id ? (
                  <div className={s.icons}>
                    <Play />
                    <Trash callBack={() => props.removeDecks(el.id)} />
                    <Pencil callback={() => setDecksParams(true, el)} />
                    {open && deck && (
                      <EditPack open={open} setDeck={setDeck} setOpen={setOpen} data={deck} />
                    )}
                  </div>
                ) : (
                  <div className={s.icons}>
                    <Play />
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Tbody>
      </TableRoot>
    </div>
  )
}
