type settingType = {
  id: number
}

type ArticleFormType = Omit<ArticleType, 'createdAt' | 'updatedAt'>
