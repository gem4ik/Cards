import { FC, useState } from 'react'

import { useForm } from 'react-hook-form'

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
  const [open, setOpen] = useState(false)
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
      setOpen(false)
    }
  })

  return (
    <form onSubmit={submitHandler}>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          submitButtonTitle={'Add New Card'}
          title={'Add New Card'}
        >
          <ControlledTextfield control={control} name={'question'} label={'question'} />
          <ControlledTextfield control={control} name={'answer'} label={'answer'} />
        </Modal>
      )}
      <Button type={'button'} onClick={() => setOpen(!open)}>
        Add New Card
      </Button>
    </form>
  )
}
