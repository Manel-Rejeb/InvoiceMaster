export interface ArticleStore {
  isLoading: boolean
  data: ArticleType[]
}

export const articleStore: ArticleStore = {
  isLoading: false,
  data: [],
}
