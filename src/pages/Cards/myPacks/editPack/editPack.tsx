import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledTextfield, Modal } from '@/components'
import { useUpdateDeckMutation } from '@/services'

type DataFormType = {
  name: string
  isPrivate: boolean
  cover: string
}
type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  deckId: string
}
export const EditPack = (props: Props) => {
  console.log(props.deckId)
  const { handleSubmit, control } = useForm<DataFormType>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      isPrivate: false,
      cover: '',
    },
  })
  const [updateDeck] = useUpdateDeckMutation()
  const onSubmitHandler = handleSubmit(data => {
    updateDeck({ id: props.deckId, ...data })
    props.setOpen(false)
  })

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Modal
          title={'Edit Pack'}
          open={props.open}
          setOpen={props.setOpen}
          submitButtonTitle={'Save Changes'}
        >
          <ControlledTextfield control={control} name={'name'} />
          <ControlledCheckbox control={control} name={'isPrivate'} />
        </Modal>
      </form>
    </div>
  )
}
