import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './modal.module.scss'

import { Cross } from '@/assets'

export type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  children?: React.ReactNode
  title?: string
} & ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ open, setOpen, children, title }, ref): JSX.Element => {
    return (
      <div ref={ref} onClick={() => setOpen(!open)}>
        {open && (
          <div
            className={s.modalWrapper}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
          >
            <div className={s.modalContent}>
              {title && (
                <div className={s.title}>
                  <h4>{title}</h4>
                  <Cross onClick={() => setOpen(!open)} />
                </div>
              )}
              <div>{children}</div>
            </div>
          </div>
        )}
      </div>
    )
  }
)
