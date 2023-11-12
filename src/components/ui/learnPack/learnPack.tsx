import { useState } from 'react'

import s from './learnPack.module.scss'

import { Button, Modal, Radio, Typography } from '@/components'
import { useLearnDeckRatingMutation, useLearnRandomDeckQuery } from '@/services'
type Props = {
  open: boolean
  setOpen: () => void
  title: string
  deckId?: string
}

const rate = ['Did not know', 'Forgot', 'A lot of though', 'Confused', 'Knew the answer']

export const LearnPack = ({ open, setOpen, title, deckId }: Props) => {
  const packTitle = `learn ${title}`
  const { data, isFetching } = useLearnRandomDeckQuery(deckId)
  const [openAnswer, setOpenAnswer] = useState(false)
  const [grade, setGrade] = useState(0)
  const [saveGrade] = useLearnDeckRatingMutation()

  const onclickHandler = () => {
    setOpenAnswer(!openAnswer)
    if (openAnswer) {
      saveGrade({ id: deckId!, cardId: data.id, grade: grade })
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={packTitle}>
      {isFetching ? (
        <div>isLoading</div>
      ) : (
        <section className={s.modalWrapper}>
          <div className={s.modal}>
            <div className={s.questionBlock}>
              <Typography variant={'subtitle1'}>
                Question: &nbsp;
                {
                  <Typography as={'span'} variant={'body1'}>
                    {data?.question}
                  </Typography>
                }
              </Typography>
              <Typography variant={'body2'}>
                Количество попыток ответов на вопрос:{data?.shots}
              </Typography>
            </div>
            {openAnswer && (
              <div className={s.answerBlock}>
                <Typography variant={'subtitle1'}>
                  Answer: &nbsp;
                  {
                    <Typography as={'span'} variant={'body1'}>
                      {data?.answer}
                    </Typography>
                  }
                </Typography>
                <Typography variant={'subtitle1'}>Rate yourself:</Typography>
                <Radio callback={value => setGrade(rate.indexOf(value) + 1)} labels={rate} />
              </div>
            )}
          </div>
          <div className={s.modalButton}>
            <Button onClick={onclickHandler} fullWidth>
              {(openAnswer && 'Next Question') || 'Show Answer'}
            </Button>
          </div>
        </section>
      )}
    </Modal>
  )
}
