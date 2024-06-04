export interface UserStore {
  isAuthenticated: boolean
  data: UserType[]
  isLoading: boolean
  user: AuthUserProfileType

  login: (data: LoginFormType) => Promise<void>
  logout: () => Promise<boolean>
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
  logout: () => new Promise<boolean>((resolve, reject) => {}),
}
