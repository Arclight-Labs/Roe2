import { User } from "firebase/auth"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { createContext } from "react"
import { UserModel } from "utils/models/User.model"

export interface Roe2Auth {
  userDoc: QueryDocumentSnapshot<UserModel> | null
  user: UserModel | null
  auth: User | null
  loading: boolean
  accessToken: string
}

export const defaultRoe2AuthContext = {
  auth: null,
  loading: true,
  user: null,
  userDoc: null,
  accessToken: "",
}

export const authContext = createContext<Roe2Auth>(defaultRoe2AuthContext)
