import { ComponentPropsWithoutRef, forwardRef } from 'react'

import cn from 'classnames'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProp }, ref) => {
  const classNames = cn(s.root, className)

  return <div ref={ref} className={classNames} {...restProp}></div>
})
