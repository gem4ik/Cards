import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import Eye from './../../../assets/eye.png'
import EyeOff from './../../../assets/eyeOff.png'
import search from './../../../assets/search.png'
import s from './textfield.module.scss'

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
  const isShowPasswordButtonShown = type === 'password'
  const isSearchButtonShown = type === 'search'
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.currentTarget.value)
  }

  return (
    <div>
      {label && (
        <Typography className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.fieldContainer}>
        <div className={s.inputWrapper}>
          {isSearchButtonShown && (
            <button className={s.SearchButton} onClick={() => setShowPassword(prev => !prev)}>
              <img src={search} alt="search" />
            </button>
          )}
          <input
            className={`${s.field} ${error ? s.error : ''} ${className || ''}`}
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            value={'asdasdasdasdasdasdasdasdasdaasdasda'}
          />
          {isShowPasswordButtonShown && (
            <button className={s.PasswordButton} onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <img src={EyeOff} alt={'eyeOff'} /> : <img src={Eye} alt={'Eye'} />}
            </button>
          )}
        </div>
      </div>
      {error && <Typography variant={'body2'}>{error}</Typography>}
    </div>
  )
}
