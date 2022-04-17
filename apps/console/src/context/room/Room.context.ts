import { Room, User } from "interface"
import { createContext } from "react"

export const roomContext = createContext<User | null>(null)

type LoginOrCreate = (username: string, password: string) => Promise<any>
type RoomActions = {
  set: (Partial: Room) => void
  logout: VoidFunction
  login: LoginOrCreate
  create: LoginOrCreate
}

export const roomActions = createContext<RoomActions>({
  login: async () => {},
  logout: () => {},
  set: () => {},
  create: async () => {},
})
