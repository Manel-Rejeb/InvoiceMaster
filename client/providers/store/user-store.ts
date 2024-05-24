export interface UserStore {
  isAuthenticated: boolean

  user: AuthUserProfileType

  login: (data: LoginFormType) => Promise<void>
  logout: () => Promise<boolean>
}

export const userStore: UserStore = {
  isAuthenticated: false,

  user: {
    username: '',
    role: '',
    firstName: '',
    lastName: '',
    badgeNumber: '',
    isEligibleForEvaluation: false,
    authorities: [],
  },

  login: (data: LoginFormType) => new Promise<void>((resolve, reject) => {}),
  logout: () => new Promise<boolean>((resolve, reject) => {}),
}