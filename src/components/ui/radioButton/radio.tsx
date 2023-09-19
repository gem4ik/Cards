import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './/radio.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {
  labels: string[]
}

export const Radio = (props: Props) => {
  const { labels } = props

  return (
    <form>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue="default"
        aria-label="View density"
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
    </form>
  )
}
