import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Separator } from '@radix-ui/themes'

import s from './modal.module.scss'

import { Cross } from '@/assets'
import { Button, Card } from '@/components'

export type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  children?: React.ReactNode
  title?: string
  submitButtonTitle?: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ open, setOpen, children, title, submitButtonTitle }, ref): JSX.Element => {
    return (
      <div ref={ref} onClick={() => setOpen(!open)}>
        {open && (
          <Card
            className={s.modalWrapper}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
          >
            {title && (
              <div className={s.modal__titleWrapper}>
                <div className={s.modal__title}>
                  <h4>{title}</h4>
                  <Cross color={'var(--color-light-100)'} onClick={() => setOpen(!open)} />
                </div>
                <Separator className={s.modal__titleSeparator} />
              </div>
            )}
            {children}
            <div className={s.modal__buttonsBlock}>
              <Button onClick={() => setOpen(false)} type={'button'} variant={'secondary'}>
                Cancel
              </Button>
              <Button>{submitButtonTitle}</Button>
            </div>
          </Card>
        )}
      </div>
    )
  }
)
