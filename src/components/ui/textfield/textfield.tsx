import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { clsx } from 'clsx'

import s from './textfield.module.scss'

import { Cross, Eye, EyeOff, Search } from '@/assets'
import { Typography } from '@/components'

export type TextfieldProps = {
  checked?: boolean
  error?: string
  label?: string
  placeholder?: string
  className?: string
  onChangeText?: (value: string) => void
  type?: string
  disabled?: boolean
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Textfield = (props: TextfieldProps) => {
  const {
    fullWidth,
    error,
    label,
    placeholder,
    onChangeText,
    className,
    type,
    disabled,
    onChange,
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const [click, setClick] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }

  useEffect(() => {
    if (type === 'password') setShowPassword(true)
  }, [])
  const searchButton = clsx(s.button, { [s.searchButton]: type === 'search' })
  const passwordButton = clsx(s.button, s.EyeButton, {
    [s.passwordButton]: type === 'password',
  })
  const inputClasses = clsx(
    s.field,
    error && s.error,
    className,
    type === 'password' && s.passwordInput,
    type === 'search' && s.searchInput
  )

  let searchButtonColor: string

  if (!disabled) {
    searchButtonColor = click ? '#C3C1C7' : '#808080'
  } else {
    searchButtonColor = '#4C4C4C'
  }

  return (
    <div className={`${s.textfieldWrapper} ${fullWidth ? s.fullWidth : ''}`}>
      {label && (
        <Typography className={label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.fieldContainer}>
        <input
          value={props.value}
          disabled={disabled}
          onMouseDown={() => setClick(true)}
          onMouseUp={() => setClick(false)}
          className={inputClasses}
          type={showPassword ? 'password' : 'text'}
          placeholder={error ? error : placeholder}
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            tabIndex={-1}
            type={'button'}
            className={passwordButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
        {type === 'search' && (
          <>
            <button tabIndex={-1} type={'button'} className={searchButton}>
              <Search color={searchButtonColor} />
            </button>
            <button tabIndex={-1} type={'button'} className={clsx(s.button, s.cross)}>
              <Cross color={searchButtonColor} />
            </button>
          </>
        )}
      </div>
      {error && <Typography variant={'error'}>{error}</Typography>}
    </div>
  )
}
