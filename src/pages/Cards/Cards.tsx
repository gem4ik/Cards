import { useState } from 'react'

import moment from 'moment/moment'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating' //https://www.npmjs.com/package/react-simple-star-rating

import f from './Cards.module.scss'

import {
  BackArrow,
  CardsItems,
  Edit2Outline,
  Pencil,
  PlayCircleOutline,
  Trash,
  TrashOutline,
} from '@/assets'
import { MoreVerticaleOutline } from '@/assets/components/moreVerticalOutline/moreVerticaleOutline.tsx'
import { ModalType } from '@/assets/types/commonTypes.ts'
import {
  Button,
  Column,
  DeleteSubmit,
  DropdownMenuRadix,
  DropDownMenuWithIcon,
  Sort,
  Table,
  TableRoot,
  Textfield,
  Typography,
} from '@/components'
import { LearnPack } from '@/components/ui/learnPack/learnPack.tsx'
import { AddNewCard } from '@/pages'
import {
  useGetCardsByIdQuery,
  useGetMeQuery,
  useRemoveDeckMutation,
  useUpdateDeckMutation,
} from '@/services'

export const Cards = () => {
  const { state } = useLocation()
  const { data } = useGetCardsByIdQuery(state.decksId!)
  const { data: Me } = useGetMeQuery()

  const isMyId = Me?.id === state.authorId
  const navigate = useNavigate()
  const [removeDecks] = useRemoveDeckMutation()
  const [changeDeck] = useUpdateDeckMutation()
  const [sort, setSort] = useState<Sort>({ key: 'cardsCount', direction: 'asc' })
  const [open, setOpen] = useState<ModalType>('')
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
    {
      key: 'actions',
      title: '',
      sortable: false,
    },
  ]
  const friendsColumns: Column[] = [
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
  const [openLearnModal, setOpenLearnModal] = useState(false)
  const submitHandler = (id: string) => {
    removeDecks(id)
    navigate('/')
  }

  return (
    <div className={f.myPacksWrapper}>
      <Link to={'/'} className={f.backToList}>
        <BackArrow />
        <Typography style={{ marginLeft: '5px' }} variant={'body2'}>
          Back to Packs List
        </Typography>
      </Link>

      <div className={f.myPackHeading}>
        <div className={f.dropDown}>
          <Typography variant={'h1'}>{state.PackName}</Typography>
          {isMyId && (
            <DropdownMenuRadix trigger={<MoreVerticaleOutline />}>
              <DropDownMenuWithIcon
                icon={<PlayCircleOutline />}
                onSelect={() => {
                  setOpenLearnModal(true)
                }}
                itemText={'Learn'}
              />

              <DropDownMenuWithIcon icon={<Edit2Outline />} onSelect={() => {}} itemText={'Edit'} />

              <DropDownMenuWithIcon
                icon={<TrashOutline />}
                onSelect={() => setOpen('trash')}
                itemText={'Delete'}
              />
            </DropdownMenuRadix>
          )}
        </div>
        {!isMyId ? (
          <Button
            onClick={() => {
              setOpenLearnModal(true)
            }}
          >
            Learn To Pack
          </Button>
        ) : (
          <AddNewCard id={state.decksId} />
        )}
      </div>
      <Textfield
        className={f.searchDeck}
        fullWidth={true}
        type={'search'}
        placeholder={'Input search'}
      />
      <div className={f.table}>
        <TableRoot>
          <Table.Header columns={isMyId ? columns : friendsColumns} sort={sort} onSort={setSort} />
          <Table.Tbody>
            {data?.items.map((el: CardsItems) => (
              <Table.Row key={el.id}>
                <Table.Cell>{el.question}</Table.Cell>
                <Table.Cell>{el.answer}</Table.Cell>
                <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell className={f.RatingCell}>
                  <Rating
                    initialValue={el.grade}
                    size={13}
                    SVGstrokeColor={'#e3ab39'}
                    SVGstorkeWidth={1}
                    fillColor={'#e3ab39'}
                    emptyColor={'transparent'}
                    readonly
                  />
                </Table.Cell>
                {isMyId && (
                  <Table.Cell>
                    <div className={f.icons}>
                      <Trash />
                      <Pencil callback={() => changeDeck({ id: el.id })} />
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Tbody>
        </TableRoot>
      </div>
      <DeleteSubmit
        open={open === 'trash'}
        setOpen={setOpen}
        deletedItem={'Delete Pack'}
        item={'Pack'}
        submit={() => submitHandler(state.decksId!)}
      />

      {openLearnModal && (
        <LearnPack
          open={openLearnModal}
          setOpen={() => setOpenLearnModal(false)}
          title={state.PackName}
          deckId={state.decksId}
        />
      )}
    </div>
  )
}
