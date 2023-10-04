import { ComponentPropsWithoutRef, forwardRef } from 'react'

import cn from 'classnames'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProp }, ref) => {
  const classNames = cn(s.root, className)

  // let sizeVariant
  // switch (sizeName) {
  //   case 'signInForm':
  //     sizeVariant = s.signIn
  //     break
  //   case 'signUpForm':
  //     sizeVariant = s.signUp
  //     break
  //   case 'forgotForm':
  //     sizeVariant = s.forgot
  //     break
  //   case 'emailForm':
  //     sizeVariant = s.email
  //     break
  //   default:
  //     sizeVariant = ''
  // }
  // const cardStyles = cn(classNames, sizeVariant)

  return <div ref={ref} className={classNames} {...restProp}></div>
})
