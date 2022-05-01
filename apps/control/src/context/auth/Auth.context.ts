import { User } from "firebase/auth"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { User as Roe2User } from "interface"
import { createContext } from "react"

export interface Roe2Auth {
  userDoc: QueryDocumentSnapshot<Roe2User> | null
  user: Roe2User | null
  auth: User | null
  loading: boolean
}

export const defaultRoe2AuthContext = {
  auth: null,
  loading: true,
  user: null,
  userDoc: null,
}

export const authContext = createContext<Roe2Auth>(defaultRoe2AuthContext)

export type EmailAndPassFn = (email: string, password: string) => Promise<any>
