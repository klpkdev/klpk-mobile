export interface IMePayload {
  fullName: string
  email: string
  username: string
  phone: string
}

export interface IMeModel {
  id: string
  fullName: string
  email: string
  username: string
  phone: string
  role: string
  verified: boolean
  followersCount: number
  coinBalance: number
  verification: boolean | null
}

export interface IMePayloadCover {
  file: FormData
}

export interface IMePayloadAvatar {
  file: FormData
}
