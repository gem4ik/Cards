import { useDispatch } from 'react-redux'

import s from './decksFilter.module.scss'

import { Trash } from '@/assets'
import { Button, RangeSlider, TabSwitcher, Textfield, Typography } from '@/components'
import { appActions } from '@/services'

type Props = {
  searchName: string
  rangeOptions: number[]
  clearFilters: () => void
}
export const DecksFilter = ({ searchName, rangeOptions, clearFilters }: Props) => {
  const dispatch = useDispatch()

  return (
    <div className={s.filterWrapper}>
      <Textfield
        value={searchName}
        className={s.searchInput}
        placeholder={`Search By Deck's name`}
        type={'search'}
        onChangeText={value => dispatch(appActions.setSearchName(value))}
      />
      <div>
        <Typography variant={'body2'}>Show packs cards</Typography>
        <TabSwitcher
          values={['My Cards', 'All Cards']}
          onValueChange={value => dispatch(appActions.setAuthor(value))}
        />
      </div>
      <div>
        <Typography variant={'body2'}>Number of cards</Typography>
        <RangeSlider
          range={rangeOptions}
          onChange={values => dispatch(appActions.setRangeValue(values))}
        ></RangeSlider>
      </div>
      <Button variant={'secondary'} onClick={clearFilters}>
        {<Trash />}Clear Filter
      </Button>
    </div>
  )
}
