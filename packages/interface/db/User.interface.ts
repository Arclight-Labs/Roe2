export interface User {
  uid: string
  email: string
  username: string
  _username: string
  socialHandle: string
  avatar: string
  type: UserType
}

export type UserType = "admin" | "talent" | "default"

export type UserAuthClaims = Partial<{
  super_admin: boolean
  admin: boolean
}>
