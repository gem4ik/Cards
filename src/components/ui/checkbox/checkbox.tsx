import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import * as RadixLabel from '@radix-ui/react-label'
import cn from 'classnames'

import s from './checkbox.module.scss'
// eslint-disable-next-line import/no-unresolved

import Check from '@/components/ui/checkbox/check.tsx'
import { Typography } from '@/components/ui/typography'

export type CheckboxProps = Partial<{
  checked: boolean
  onChange: (checked: boolean) => void
  disabled: boolean
  required: boolean
  label: string
  id: string
  position: 'left'
  className: string
}> &
  ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ checked, onChange, disabled, required, label, id, position, className }, ref): JSX.Element => {
    const classNames = {
      container: className,
      checkboxWrapper: cn(s.checkboxWrapper, disabled && s.disabled, position === 'left' && s.left),
      root: s.checkboxRoot,
      indicator: s.indicator,
      label: (s.label, disabled && s.disabled),
    }

    return (
      <div className={classNames.container}>
        <RadixLabel.Root asChild>
          <Typography className={s.label}>
            <div className={classNames.checkboxWrapper}>
              <RadixCheckbox.Root
                ref={ref}
                className={classNames.root}
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
                required={required}
                id={id}
              >
                {checked && (
                  <RadixCheckbox.Indicator className={classNames.indicator} forceMount>
                    <Check />
                  </RadixCheckbox.Indicator>
                )}
              </RadixCheckbox.Root>
            </div>
            {label}
          </Typography>
        </RadixLabel.Root>
      </div>
    )
  }
)
