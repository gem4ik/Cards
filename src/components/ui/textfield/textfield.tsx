import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './textfield.module.scss'

import { Cross } from '@/assets/components/inputIcon/cross.tsx'
import { Eye } from '@/assets/components/inputIcon/eye.tsx'
import { EyeOff } from '@/assets/components/inputIcon/eyeOff.tsx'
import { Search } from '@/assets/components/inputIcon/search.tsx'
import { Typography } from '@/components/ui/typography'

export type TextfieldProps = {
  checked?: boolean
  error?: string
  label?: string
  placeholder?: string
  className?: string
  onChangeText?: (value: string) => void
  type?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Textfield = (props: TextfieldProps) => {
  const { error, label, placeholder, onChangeText, className, type, disabled, onChange } = props
  const [showPassword, setShowPassword] = useState(false)
  const [click, setClick] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }

  const searchButton = `${s.button} ${type === 'search' ? s.searchButton : ''}`
  const passwordButton = `${s.button} ${s.EyeButton} ${type === 'password' ? s.passwordButton : ''}`
  const input = `${type === 'password' || type === 'search' ? s.input : ''} ${
    type === 'password' ? s.passwordInput : ''
  } ${type === 'search' ? s.searchInput : ''}`

  let searchButtonColor: string

  if (!disabled) {
    searchButtonColor = click ? '#C3C1C7' : '#808080'
  } else {
    searchButtonColor = '#4C4C4C'
  }

  return (
    <div className={s.textfieldWrapper}>
      {label && (
        <Typography className={label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.fieldContainer}>
        <input
          disabled={disabled}
          onMouseDown={() => setClick(true)}
          onMouseUp={() => setClick(false)}
          className={`${s.field} ${input} ${error ? s.error : ''} ${className || ''}`}
          type={showPassword ? 'password' : 'text'}
          placeholder={error ? error : placeholder}
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            type={'button'}
            className={passwordButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
        {type === 'search' && (
          <>
            <button type={'button'} className={searchButton}>
              <Search color={searchButtonColor} />
            </button>
            <button type={'button'} className={`${s.button} ${s.cross}`}>
              <Cross color={searchButtonColor} />
            </button>
          </>
        )}
      </div>
      {error && <Typography variant={'error'}>{error}</Typography>}
    </div>
  )
}
