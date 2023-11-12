import { Button, Typography } from '@/components'

export const LearnPack = () => {
  return (
    <>
      <Typography variant={'large'}>Learn</Typography>
      <Typography variant={'subtitle1'}>Question: How "This" works in JavaScript?</Typography>
      <Typography variant={'body2'}>Количество попыток ответов на вопрос: 10</Typography>
      <Button fullWidth={true}>Show Answer</Button>
    </>
  )
}
