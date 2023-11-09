import { useForm } from 'react-hook-form'

import s from './editPack.module.scss'

import { Deck } from '@/assets'
import { ModalType } from '@/assets/types/commonTypes.ts'
import { Button, ControlledCheckbox, ControlledTextfield, Modal } from '@/components'
import { useUpdateDeckMutation } from '@/services'

type DataFormType = {
  name: string
  isPrivate: boolean
  cover: string
}

type Props = {
  open: boolean
  setOpen: (value: ModalType) => void
  setDeck: (value: null) => void
  data: Deck
}
export const EditPack = (props: Props) => {
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
    props.setOpen('')
    props.setDeck(null)
  })

  return (
    <div className={s.editPack__wrapper}>
      <form className={s.editPack__form} onSubmit={onSubmitHandler}>
        <Modal
          title={'Edit Pack'}
          open={props.open}
          setOpen={props.setOpen}
          submitButtonTitle={'Save Changes'}
        >
          <div className={s.editPack}>
            <ControlledTextfield
              control={control}
              name={'name'}
              label={'Name Pack'}
              title={props.data.name}
              fullWidth
            />
            <ControlledCheckbox control={control} name={'isPrivate'} label={'Private pack'} />
            <div className={s.modal__buttonsBlock}>
              <Button onClick={() => props.setOpen('')} type={'button'} variant={'secondary'}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  )
}
