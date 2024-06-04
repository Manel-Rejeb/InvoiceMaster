interface AuthLogin {
  email: string
  password: string
  remember: boolean
}

type LoginFormType = Omit<AuthLogin, 'remember'>

interface JwtToken {}

interface AuthUserProfileType {
  id: number
  email: string
  username: string
  isActive: boolean
  role: string
}
