export interface ILoginToken {
  refreshToken: string
  token: string
  expirationDate: string
  isLogin: boolean
}

export interface INav {
  active: string
}
