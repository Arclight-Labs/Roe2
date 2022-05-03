import { useContext } from "react"
import { roomContext } from "./Room.context"

export const useRoom = () => useContext(roomContext)
