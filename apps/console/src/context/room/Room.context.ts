import { Room } from "interface"
import { createContext } from "react"

export const roomContext = createContext<Room | null>(null)

type Join = (username: string, password: string) => Promise<any>
type RoomActions = {
  // set: (Partial: Room) => void
  leave: VoidFunction
  join: Join
  // create: Join
}

export const roomActions = createContext<RoomActions>({
  join: async () => {},
  leave: () => {},
  // set: () => {},
  // create: async () => {},
})
