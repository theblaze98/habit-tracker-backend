export type createUserDto = {
  username: string
  email: string
  password: string
}

export type updateUserDto = {
  username?: string
  email?: string
  password?: string
}
