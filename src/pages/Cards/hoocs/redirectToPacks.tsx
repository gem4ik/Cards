import { useLocation } from 'react-router-dom'

import { FriendsPack, MyPacks } from '@/pages'
import { useGetMeQuery } from '@/services'

export const RedirectToPacks = () => {
  const { state } = useLocation()
  const { data } = useGetMeQuery()

  console.log(state)

  const myId = data?.id

  if (state.authorId === myId) {
    return <MyPacks decksId={state.decksId} />
  } else {
    return <FriendsPack decksId={state.decksId} />
  }
}
