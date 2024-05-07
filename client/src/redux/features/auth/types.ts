export type ILogin = {
  user_id?: string
  token: string
  status?: string
  refreshToken?: string
  expiresAt?: string
}

export type UserDataDto = {
  firstname: string
  lastname: string
  email: string
  role: {
    id: number | null
    roleEnum: string
  }
}
