import { useLocation } from 'react-router-dom'
import { useGetMeQuery } from '@/services'
import { MyPacks } from '@/pages/Decks/myPacks/myPacks.tsx'
import { FriendsPack } from '@/pages/Decks/riendsPack/friendsPack.tsx'

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
