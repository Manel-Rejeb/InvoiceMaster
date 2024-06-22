export interface UserStore {
  data: UserType[]
  isLoading: boolean

  user: AuthUserProfileType
  isAuthenticated: boolean
  login: (data: LoginFormType) => Promise<void>
  logout: () => void
}

export const userStore: UserStore = {
  isAuthenticated: false,
  isLoading: false,
  data: [],

  user: {
    id: 0,
    username: '',
    email: '',
    role: '',
    isActive: false,
  },

  login: (data: LoginFormType) => new Promise<void>((resolve, reject) => {}),
  logout: () => {},
}
