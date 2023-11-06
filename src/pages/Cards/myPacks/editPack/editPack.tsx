import { useForm } from 'react-hook-form'

import { Deck } from '@/assets'
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
  setDeck: (value: null) => void
  data: Deck
}
export const EditPack = (props: Props) => {
  // const { data, isLoading } = useGetDecksByAuthorIdQuery(props.deckId)
  const [updateDeck] = useUpdateDeckMutation()

  const { handleSubmit, control } = useForm<DataFormType>({
    mode: 'onSubmit',
    defaultValues: {
      name: props.data.name,
      isPrivate: false,
      cover: '',
    },
  })
  const onSubmitHandler = handleSubmit(data => {
    updateDeck({ id: props.data.id, ...data })
    props.setOpen(false)
    props.setDeck(null)
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
          <ControlledTextfield
            control={control}
            name={'name'}
            label={'Name Pack'}
            title={props.data.name}
          />
          <ControlledCheckbox control={control} name={'isPrivate'} label={'Private pack'} />
        </Modal>
      </form>
    </div>
  )
}
