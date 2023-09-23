import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './textfield.module.scss'

import { Cross } from '@/assets/svgComponents/cross.tsx'
import { Eye } from '@/assets/svgComponents/eye.tsx'
import { EyeOff } from '@/assets/svgComponents/eyeOff.tsx'
import { Search } from '@/assets/svgComponents/search.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  checked: boolean
  error?: string
  label?: string
  placeholder?: string
  className?: string
  onChangeText: (value: string) => void
  type?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Textfield = (props: Props) => {
  const { error, label, placeholder, onChangeText, className, type, disabled } = props
  const [showPassword, setShowPassword] = useState(false)
  const [click, setClick] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.currentTarget.value)
  }

  const searchButton = `${s.button} ${type === 'search' ? s.searchButton : ''}`
  const passwordButton = `${s.button} ${s.EyeButton} ${type === 'password' ? s.passwordButton : ''}`
  const input = `${type === 'password' || type === 'search' ? s.input : ''} ${
    type === 'password' ? s.passwordInput : ''
  }`

  let searchButtonColor: string

  if (!disabled) {
    searchButtonColor = click ? '#C3C1C7' : '#808080'
  } else {
    searchButtonColor = '#4C4C4C'
  }

  return (
    <div>
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
        <button className={passwordButton} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
        <div className={searchButton}>
          <button className={`${s.button} ${s.search}`}>
            <Search color={searchButtonColor} />
          </button>
          <button className={`${s.button} ${s.cross}`} onClick={() => {}}>
            <Cross color={searchButtonColor} />
          </button>
        </div>
      </div>
      {error && <Typography variant={'error'}>{error}</Typography>}
    </div>
  )
}
