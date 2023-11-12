import { useState } from 'react'

import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import s from './DecksTable.module.scss'

import { Deck, Pencil, Play, Trash } from '@/assets'
import { ModalType } from '@/assets/types/commonTypes.ts'
import { Column, DeleteSubmit, Sort, Table, TableRoot } from '@/components'
import { LearnPack } from '@/components/ui/learnPack/learnPack.tsx'
import { EditPack } from '@/pages'
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
  const [open, setOpen] = useState<ModalType>('')
  const [openLearnModal, setOpenLearnModal] = useState(false)
  const [deck, setDeck] = useState<Deck | null>(null)
  const [learnPackTitle, setLearnPackTitle] = useState('')
  const [learnPackId, setLearnId] = useState('')

  const setDecksParams = (value: ModalType, deck: Deck) => {
    setOpen(value)
    setDeck(deck)
  }
  const deletePack = (value: ModalType) => {
    setOpen(value)
  }
  const removeDeck = (id: string) => {
    props.removeDecks(id)
  }
  const learnPackHandler = (title: string, deckId: string) => {
    setOpenLearnModal(true)
    setLearnPackTitle(title)
    setLearnId(deckId)
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
                  state={{ PackName: el.name, authorId: el.author.id, decksId: el.id }}
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
                    <Play callback={() => learnPackHandler(el.name, el.id)} />
                    <Trash callBack={() => deletePack('trash')} />
                    <Pencil callback={() => setDecksParams('pencil', el)} />
                    <DeleteSubmit
                      deletedItem={'Delete Pack'}
                      item={'Pack'}
                      open={open === 'trash'}
                      setOpen={setOpen}
                      submit={() => {
                        removeDeck(el.id)
                      }}
                    />
                    {deck && (
                      <EditPack
                        open={open === 'pencil'}
                        setDeck={setDeck}
                        setOpen={setOpen}
                        data={deck}
                      />
                    )}
                  </div>
                ) : (
                  <div className={s.icons}>
                    <Play callback={() => learnPackHandler(el.name, el.id)} />
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Tbody>
      </TableRoot>
      {openLearnModal && (
        <LearnPack
          open={openLearnModal}
          setOpen={() => setOpenLearnModal(false)}
          title={learnPackTitle}
          deckId={learnPackId}
        />
      )}
    </div>
  )
}
