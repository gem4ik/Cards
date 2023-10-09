import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { SelectGroup, SelectItem } from '@radix-ui/react-select'

import s from './select.module.scss'

export type Props = {
  items?: string[]
  disabled: boolean
  onPageSizeChange: (value: string) => void
  placeholder?: number
} & ComponentPropsWithoutRef<typeof Select.Root>

export const Selector = forwardRef<ElementRef<typeof Select.Trigger>, Props>((props, ref) => {
  const { items, placeholder } = props
  const mappedItems = items?.map((el, index) => {
    return (
      <SelectItem key={index} className={s.SelectContent} value={el}>
        <Select.ItemText>{el}</Select.ItemText>
      </SelectItem>
    )
  })

  return (
    <Select.Root onValueChange={value => props.onPageSizeChange(value)}>
      <Select.Trigger
        ref={ref}
        disabled={props.disabled}
        className={s.SelectTrigger}
        aria-label="select"
      >
        <Select.Value placeholder={placeholder ? placeholder : 'select'} />
        <Select.Icon className={s.SelectIcon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" sideOffset={5} className={s.SelectContent}>
          <Select.ScrollUpButton className={s.SelectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className={s.SelectViewport}>
            <SelectGroup>{mappedItems}</SelectGroup>
          </Select.Viewport>
          <Select.ScrollDownButton className={s.SelectScrollButton}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
})
