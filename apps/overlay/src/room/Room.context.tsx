import { RoomModel } from "utils/models/Room.model"
import { createContext } from "react"

export const roomContext = createContext<RoomModel | null>(null)
