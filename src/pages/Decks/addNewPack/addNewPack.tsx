import { useState } from 'react'

import { useForm } from 'react-hook-form'

import s from './addNewPack.module.scss'

import { ModalType } from '@/assets/types/commonTypes.ts'
import { Button, ControlledCheckbox, ControlledTextfield, Modal } from '@/components'
import { useAddDeckMutation } from '@/services'

type DataForm = {
  name: string
  isPrivate: boolean
}

export const AddNewPack = () => {
  const [open, setOpen] = useState<ModalType>('')

  const { handleSubmit, control, reset } = useForm<DataForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })

  const [addDeck] = useAddDeckMutation()

  const submitHandler = handleSubmit(data => {
    addDeck(data)
    setOpen('')
    reset()
  })

  return (
    <form onSubmit={submitHandler}>
      {open && (
        <Modal open={open === 'open'} title={'Add New Pack'} setOpen={setOpen}>
          <div className={s.addPack__formWrapper}>
            <ControlledTextfield fullWidth control={control} name={'name'} label={'name '} />
            <ControlledCheckbox control={control} name={'isPrivate'} label={'Private pack'} />
          </div>
          <div className={s.modal__buttonsBlock}>
            <Button onClick={() => setOpen('')} type={'button'} variant={'secondary'}>
              Cancel
            </Button>
            <Button>Add New Pack</Button>
          </div>
        </Modal>
      )}
      <Button type={'button'} onClick={() => setOpen('open')}>
        Add New Pack
      </Button>
    </form>
  )
}
