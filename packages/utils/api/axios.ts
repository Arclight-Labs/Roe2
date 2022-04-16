import axios from "axios"
import { Room } from "interface/db"

export const ax = axios.create({
  baseURL: "http:localhost:14000",
  withCredentials: true,
})

interface JoinRoom {
  roomName: string
  password: string
}
export const joinRoom = async (props: JoinRoom) => {
  return ax.post<JoinRoom, Room>("/room/authenticate", props)
}
