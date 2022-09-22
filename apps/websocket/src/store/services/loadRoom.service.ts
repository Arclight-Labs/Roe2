import axios from "axios"
import { WebsocketRoom } from "interface/ws"
import { address } from "ip"

const isDev = process.env.NODE_ENV === "development"
const devUrl = `http://${address()}:5000/api`
/**
 * Below can be an alternative `devUrl`
 * But it requires a build if any changes are made
 * `http://${ip.address()}:5000/api`
 */
const prodUrl = "https://roe2.acadarena.com/api"

const ax = axios.create({
  baseURL: isDev ? devUrl : prodUrl,
})

export const loadRoom = async (roomId: string) => {
  try {
    const res = await ax.get<WebsocketRoom>(`/rooms/${roomId}`)
    return res.data
  } catch {
    return null
  }
}
