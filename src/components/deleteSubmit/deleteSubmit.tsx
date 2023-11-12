import s from './deleteSubmit.module.scss'

import { ModalType } from '@/assets/types/commonTypes.ts'
import { Button, Modal, Typography } from '@/components'
type Props = {
  open: boolean
  setOpen: (value: ModalType) => void
  deletedItem: string
  item: string
  submit: () => void
}
export const DeleteSubmit = (props: Props) => {
  const submitHandler = () => {
    props.setOpen('')
    props.submit()
  }

  return (
    <Modal open={props.open} setOpen={props.setOpen} title={props.deletedItem}>
      <div className={s.submitText}>
        <Typography variant={'subtitle1'}>Do you really want to remove {props.item}?</Typography>
      </div>{' '}
      <div className={s.modal__buttonsBlock}>
        <Button onClick={() => props.setOpen('')} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={submitHandler}>{props.deletedItem}</Button>
      </div>
    </Modal>
  )
}
