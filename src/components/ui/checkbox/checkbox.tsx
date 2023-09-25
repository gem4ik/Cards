import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

export type Props = Partial<{
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required: boolean
  label?: string
  variant: 'default' | 'withText'
}> &
  ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, Props>(
  ({ disabled = false, onChange, checked, label }, ref) => {
    return (
      <div className={s.checkBoxWrapper}>
        <RadixCheckbox.Root
          ref={ref}
          className={`${s.checkboxRoot} ${checked ? s.active : s.inActive}`}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id="l1"
        >
          <RadixCheckbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className={`${s.label} ${disabled ? '' : s.labelDisabled}`} htmlFor={'l1'}>
            <Typography variant={'body2'}>{label}</Typography>
          </label>
        )}
      </div>
    )
  }
)
