import { FC, useState } from 'react'

import { useForm } from 'react-hook-form'

import { Button, ControlledTextfield, Modal } from '@/components'
import { useAddNewCardMutation } from '@/services'

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
  const [addNewCard] = useAddNewCardMutation()

  const sumbitHandler = handleSubmit(data => {
    if (id !== undefined && id !== null) {
      addNewCard({ id, ...data })
      setOpen(false)
    }
  })

  return (
    <form onSubmit={sumbitHandler}>
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
        Add New Pack
      </Button>
    </form>
  )
}
