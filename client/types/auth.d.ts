interface AuthLogin {
  email: string
  password: string
  remember: boolean
}

type LoginFormType = Omit<AuthLogin, 'remember'>

interface JwtToken {}

interface AuthUserProfileType {}
