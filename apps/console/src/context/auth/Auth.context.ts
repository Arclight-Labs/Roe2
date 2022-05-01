import { User } from "firebase/auth"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { User as Roe2User } from "interface"
import { createContext } from "react"

export const authContext = createContext<
  | {
      userDoc: QueryDocumentSnapshot<Roe2User>
      user: Roe2User
    }
  | { auth: User }
  | null
>(null)

export type EmailAndPassFn = (email: string, password: string) => Promise<any>
