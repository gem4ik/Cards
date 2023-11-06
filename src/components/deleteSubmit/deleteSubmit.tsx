import { ModalType } from '@/assets/types/commonTypes.ts'
import { Button, Modal } from '@/components'
import s from '@/components/ui/modal/modal.module.scss'
type Props = {
  open: boolean
  setOpen: (value: ModalType) => void
  deletedItem: string
  item: string
  submit: () => void
}
export const DeleteSubmit = (props: Props) => {
  return (
    <Modal
      submit={props.submit}
      open={props.open}
      setOpen={props.setOpen}
      submitButtonTitle={props.deletedItem}
      title={props.deletedItem}
    >
      Do you really want to remove {props.item}?
      <div className={s.modal__buttonsBlock}>
        <Button onClick={() => props.setOpen('')} type={'button'} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={props.submit}>{props.deletedItem}</Button>
      </div>
    </Modal>
  )
}
