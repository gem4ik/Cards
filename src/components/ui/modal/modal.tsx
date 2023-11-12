import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Separator } from '@radix-ui/themes'

import s from './modal.module.scss'

import { Cross } from '@/assets'
import { ModalType } from '@/assets/types/commonTypes.ts'
import { Card } from '@/components'

export type ModalProps = {
  open: boolean
  setOpen: (open: ModalType) => void
  children?: React.ReactNode
  title?: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ open, setOpen, children, title }, ref): JSX.Element => {
    return (
      <div ref={ref} onClick={() => setOpen('')}>
        {open && (
          <>
            <Card
              className={s.modalWrapper}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
              {title && (
                <div className={s.modal__titleWrapper}>
                  <div className={s.modal__title}>
                    <h4>{title}</h4>
                    <Cross color={'var(--color-light-100)'} onClick={() => setOpen('')} />
                  </div>
                  <Separator className={s.modal__titleSeparator} />
                </div>
              )}
              {children}
            </Card>
            <div onClick={() => setOpen('')} className={s.layout} />
          </>
        )}
      </div>
    )
  }
)
