import { User } from "interface"
import { createContext } from "react"

export const authContext = createContext<User | null>(null)

type LoginOrCreate = (username: string, password: string) => Promise<any>
type AuthActionProps = {
  set: (user: User | null) => void
  logout: VoidFunction
  login: LoginOrCreate
  create: LoginOrCreate
}

export const authActions = createContext<AuthActionProps>({
  login: async () => {},
  logout: () => {},
  set: () => {},
  create: async () => {},
})
