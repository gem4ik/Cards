import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Tabs } from '@radix-ui/themes'

import s from './tabSwitcher.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {
  values: string[]
  onValueChange: (value: string) => void
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabSwitcher = forwardRef<ElementRef<typeof Tabs.Root>, Props>((props, ref) => {
  const items = props.values.map(el => {
    return (
      <ToggleGroup.Item key={el} className={s.ToggleGroupItem} value={el}>
        <Typography variant={'body1'} className={'toggle'}>
          {el}
        </Typography>
      </ToggleGroup.Item>
    )
  })

  return (
    <ToggleGroup.Root
      className={s.ToggleGroup}
      type="single"
      ref={ref}
      defaultValue={props.values[0]}
      onValueChange={value => {
        if (value) {
          props.onValueChange(value)
        }
      }}
    >
      {items}
    </ToggleGroup.Root>
  )
})
