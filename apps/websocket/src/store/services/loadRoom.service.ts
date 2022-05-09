import ip from "ip"
import axios from "axios"
import { WebsocketRoom } from "interface/ws"
import { setStore } from "../store.server"
import { setRoom } from "../../events/room/setRoom.event"

const isDev = process.env.NODE_ENV === "development"
const devUrl = `http://${ip.address()}:5001/roe2-prod/us-central1/api/api`
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
