type UserType = {
  id: string
  username: string
  email: string
  password: string
  role: string
  isActive: boolean
  privilege: string
  createdAt?: string
  updatedAt?: string
  isSoftDelete: boolean
}

type UserFormType = Omit<UserType, 'createdAt' | 'updatedAt'>
