import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import search from './search.svg'
import s from './textfield.module.scss'

import { Eye } from '@/components/ui/textfield/eye.tsx'
import { EyeOff } from '@/components/ui/textfield/eyeOff.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  error?: string
  label?: string
  placeholder?: string
  className?: string
  onChangeText: (value: string) => void
  type?: string
} & ComponentPropsWithoutRef<'input'>

export const Textfield = (props: Props) => {
  const { error, label, placeholder, onChangeText, className, type } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.currentTarget.value)
  }

  const searchButton = `${s.button} ${type === 'search' ? s.searchButton : ''}`
  const passwordButton = `${s.button} ${s.EyeButton} ${type === 'password' ? s.passwordButton : ''}`
  const input = `${type === 'password' || type === 'search' ? s.input : ''}`

  return (
    <div>
      {label && (
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.fieldContainer}>
        <input
          className={`${s.field} ${input} ${error ? s.error : ''} ${className || ''}`}
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <button className={passwordButton} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
        <button className={searchButton}>
          <img src={search} alt="search" />
        </button>
      </div>
      {error && <Typography variant={'body2'}>{error}</Typography>}
    </div>
  )
}
