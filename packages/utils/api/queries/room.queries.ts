import { AxiosInstance, AxiosRequestConfig } from "axios"
import { Room } from "interface/db"

interface JoinRoom {
  username: string
  password: string
}

export const joinRoom =
  (ax: AxiosInstance) =>
  async (props: JoinRoom, config?: AxiosRequestConfig) => {
    const res = await ax.post<Room>("/room/join", props, config)
    return res.data
  }

export const leave = (ax: AxiosInstance) => async () => {
  const res = await ax.post("/room/logout")
  return res.data
}
