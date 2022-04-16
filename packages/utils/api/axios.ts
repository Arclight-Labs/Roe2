import axios from "axios"
import { Room } from "interface/db"

export const ax = axios.create({
  baseURL: "localhost:1400",
  withCredentials: true,
})

interface JoinRoom {
  username: string
  password: string
}
export const joinRoom = async (props: JoinRoom) => {
  console.log("halo")
  const res = await axios.post<JoinRoom, Room>(
    "localhost:1400/room/authenticate",
    props
  )
  console.log("res", res)
  return res
}
