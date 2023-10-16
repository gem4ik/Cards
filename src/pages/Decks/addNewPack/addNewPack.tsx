import { useState } from 'react'

import { useForm } from 'react-hook-form'

import s from './addNewPack.module.scss'

import { Button, ControlledCheckbox, ControlledTextfield, Modal } from '@/components'
import { useAddDeckMutation } from '@/services'

type DataForm = {
  name: string
  isPrivate: boolean
}

export const AddNewPack = () => {
  const [open, setOpen] = useState(false)

  const { handleSubmit, control } = useForm<DataForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const [addDeck] = useAddDeckMutation()

  const submitHandler = handleSubmit(data => {
    addDeck(data)
    console.log(data)
    setOpen(false)
  })

  return (
    <form onSubmit={submitHandler}>
      {open && (
        <Modal
          submitButtonTitle={'Add New Pack'}
          open={open}
          title={'Add New Pack'}
          setOpen={setOpen}
        >
          <div className={s.addPack__formWrapper}>
            <ControlledTextfield fullWidth control={control} name={'name'} label={'name '} />
            <ControlledCheckbox control={control} name={'isPrivate'} label={'Private pack'} />
          </div>
        </Modal>
      )}
      <Button type={'button'} onClick={() => setOpen(!open)}>
        Add New Pack
      </Button>
    </form>
  )
}
