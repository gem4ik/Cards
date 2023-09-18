import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const RangeSlider = () => {
  const [values, setValues] = useState<number[]>([1, 8])

  const changeHandler = (value: number[]) => {
    const [minValue, maxValue] = value

    if (minValue < maxValue) {
      setValues(value)
    } else {
      if (minValue === values[0]) {
        setValues([maxValue, maxValue])
      } else {
        setValues([minValue, minValue])
      }
    }
  }

  return (
    <form className={s.form}>
      <span className={s.count}>{values[0]}</span>
      <Slider.Root
        min={0}
        max={10}
        defaultValue={values}
        step={1}
        value={values}
        className={s.SliderRoot}
        onValueChange={changeHandler}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderThumb__first} />
        <Slider.Thumb className={s.SliderThumb__second} />
      </Slider.Root>
      <span className={s.count}>{values[1]}</span>
    </form>
  )
}
