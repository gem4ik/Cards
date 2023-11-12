import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio.module.scss'

import { Typography } from '@/components'

type Props = {
  labels: string[]
  callback?: (value: string) => void
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const Radio = forwardRef<ElementRef<typeof RadioGroup.Root>, Props>((props, ref) => {
  const { labels, callback } = props

  return (
    <RadioGroup.Root
      ref={ref}
      className={s.RadioGroupRoot}
      defaultValue="default"
      aria-label="View density"
      onValueChange={callback}
    >
      {labels.map((l, i) => {
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <RadioGroup.Item className={s.RadioGroupItem} value={l} id={i.toString()}>
              <RadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadioGroup.Item>
            <label className={s.Label} htmlFor={i.toString()}>
              <Typography variant={'body2'}>{l}</Typography>
            </label>
          </div>
        )
      })}
    </RadioGroup.Root>
  )
})
