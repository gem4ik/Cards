import { Provider } from 'react-redux'

import { Router } from '@/services/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
