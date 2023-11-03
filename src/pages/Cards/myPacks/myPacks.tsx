import { FC, useState } from 'react'

import moment from 'moment/moment'
import { Link } from 'react-router-dom'

import { BackArrow, Edit2Outline, Pencil, PlayCircleOutline, Trash, TrashOutline } from '@/assets'
import { MoreVerticaleOutline } from '@/assets/components/moreVerticalOutline/moreVerticaleOutline.tsx'
import {
  Column,
  DropdownMenuRadix,
  DropDownMenuWithIcon,
  Sort,
  Table,
  Textfield,
  Typography,
} from '@/components'
import { AddNewCard } from '@/pages'
import f from '@/pages/Cards/myPacks/myPacks.module.scss'
import { useGetCardsByIdQuery, useRemoveDeckMutation } from '@/services'

type Props = {
  decksId?: string
}

export const MyPacks: FC<Props> = ({ decksId }) => {
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
    {
      key: 'actions',
      title: '',
    },
  ]

  return (
    <div className={f.myPacksWrapper}>
      <Link to={'myPacks'} className={f.backToList}>
        <BackArrow />
        <Typography style={{ marginLeft: '5px' }} variant={'body2'}>
          Back to Packs List
        </Typography>
      </Link>

      <div className={f.myPackHeading}>
        <div className={f.dropDown}>
          <Typography variant={'h1'}>My Pack</Typography>
          <DropdownMenuRadix trigger={<MoreVerticaleOutline />}>
            <DropDownMenuWithIcon
              icon={<PlayCircleOutline />}
              onSelect={() => {}}
              itemText={'Learn'}
            />

            <DropDownMenuWithIcon icon={<Edit2Outline />} onSelect={() => {}} itemText={'Edit'} />

            <DropDownMenuWithIcon icon={<TrashOutline />} onSelect={() => {}} itemText={'Delete'} />
          </DropdownMenuRadix>
        </div>
        <AddNewCard id={decksId} />
      </div>
      <Textfield
        className={f.searchDeck}
        fullWidth={true}
        type={'search'}
        placeholder={'Input search'}
      />
      <div className={f.table}>
        <Table.TableRoot>
          <Table.Header columns={columns} sort={sort} onSort={setSort} />
          <Table.Tbody>
            {myPacks?.items.map(el => (
              <Table.Row key={el.id}>
                <Table.Cell>{el.question}</Table.Cell>
                <Table.Cell>{el.answer}</Table.Cell>
                <Table.Cell>{moment(el.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{el.grade}</Table.Cell>
                <Table.Cell>
                  <div className={f.icons}>
                    <Trash callBack={() => removeDecks(el.id)} />
                    <Pencil />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Tbody>
        </Table.TableRoot>
      </div>
    </div>
  )
}
