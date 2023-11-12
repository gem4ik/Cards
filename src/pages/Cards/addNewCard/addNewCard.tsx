import { FC, useState } from 'react'

import { useForm } from 'react-hook-form'

import s from './addNewCard.module.scss'

import { Button, ControlledTextfield, Modal } from '@/components'
import { useAddCardMutation } from '@/services'

type Data = {
  questionFormat: string
  question: string
  answer: string
}
type AddNewCard = {
  id: string | undefined
}
export const AddNewCard: FC<AddNewCard> = ({ id }) => {
  const [open, setOpen] = useState('')
  const { handleSubmit, control } = useForm<Data>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      answer: '',
    },
  })
  const [addCard] = useAddCardMutation()

  const submitHandler = handleSubmit(data => {
    if (id !== undefined && id !== null) {
      addCard({ id, ...data })
      setOpen('')
    }
  })

  return (
    <form onSubmit={submitHandler}>
      {open && (
        <Modal open={open === 'open'} setOpen={setOpen} title={'Add New Card'}>
          <div className={s.ModalWrapper}>
            <div className={s.modalInput}>
              <ControlledTextfield
                fullWidth
                control={control}
                name={'question'}
                label={'question'}
              />
              <ControlledTextfield fullWidth control={control} name={'answer'} label={'answer'} />
            </div>
            <div className={s.modal__buttonsBlock}>
              <Button onClick={() => setOpen('')} type={'button'} variant={'secondary'}>
                Cancel
              </Button>
              <Button>Add New Card</Button>
            </div>
          </div>
        </Modal>
      )}
      <Button type={'button'} onClick={() => setOpen('open')}>
        Add New Card
      </Button>
    </form>
  )
}
