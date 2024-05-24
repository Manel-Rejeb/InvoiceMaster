type ArticleType = {
  id: number
  article_name: string
  article_description: string
  article_price: number
  article_currency: string
  article_type: string
  article_tax_enabled: boolean
  article_unit: string
  article_buy_price: number
  createdAt?: string
  updatedAt?: string
  isSoftDelete: boolean
}

type ArticleFormType = Omit<ArticleType, 'createdAt' | 'updatedAt'>
