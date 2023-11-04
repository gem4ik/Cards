import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './avatar.module.scss'

import avatar from '@/assets/components/avatarIcon/avatar.png'

export type AvatarProps = {
  name?: string
  src?: ComponentProps<'img'>['src']
  size?: ComponentProps<'img'>['width']
} & ComponentPropsWithoutRef<'img'>

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ name, src = avatar, size = 36 }, ref) => {
    console.log(src)

    return (
      <img
        className={s.avatar}
        src={src}
        alt={`${name} avatar`}
        width={size}
        height={size}
        ref={ref}
      />
    )
  }
)
