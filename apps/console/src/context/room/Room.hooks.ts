import { useContext } from "react"
import { roomContext, roomActions } from "./Room.context"

export const useRoom = () => useContext(roomContext)
export const useRoomActions = () => useContext(roomActions)
