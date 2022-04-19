import { AxiosRequestConfig } from "axios"
import { Room } from "interface/db"
import { ax } from "../"

interface JoinRoom {
  username: string
  password: string
}

export const joinRoom = async (
  props: JoinRoom,
  config?: AxiosRequestConfig
) => {
  const res = await ax.post<Room>("/room/join", props, config)
  return res.data
}

export const logout = async () => {
  const res = await ax.post("/room/logout")
  return res.data
}
