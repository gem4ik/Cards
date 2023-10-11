import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import { ControlledCheckbox } from '@/components/ui/checkbox/controlled-checkbox.tsx'
import { Modal } from '@/components/ui/modal'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { useAddDeckMutation } from '@/services/DecksAPI.ts'

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
    setOpen(false)
  })

  return (
    <div>
      {open && (
        <Modal open={open} title={'Add New Pack'} setOpen={setOpen}>
          <form onSubmit={submitHandler}>
            <ControlledTextfield control={control} name={'name'} label={'name '} />
            <ControlledCheckbox control={control} name={'isPrivate'} label={'isPrivate'} />
            <button>add post</button>
          </form>
        </Modal>
      )}
      {!open && <Button onClick={() => setOpen(!open)}>Add New Pack</Button>}
    </div>
  )
}
