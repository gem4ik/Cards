export type DeckResponce = {
  maxCardsCount: number
  pagination: DeckPagination
  items: Deck[]
}
export type DeckPagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type Author = {
  id: string
  name: string
}
export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type GetDeckParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
}

export type CardsResponse = {
  pagination: Pagination
  items: CardsItems[]
}
export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type CardsItems = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}
export type CardParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}
export type DeckByIdResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type addDeckRequest = {
  cover: string
  name: string
  isPrivate: boolean
}
export type CreateCardsRequest = {
  question: string
  answer: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
}
export type LearnCardsResponse = {
  id: string
  cardId: string
  grade: number
}
