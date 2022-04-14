export interface User {
  _id: string
  username: string
  avatar: string | null
}

export interface UserCredentials extends User {
  password: string
}

export type UserCreate = Omit<UserCredentials, "_id">
