interface UserLoginType {
  email: string
  password: string
}

interface UserRegisterType extends UserLoginType {
  username: string
}
