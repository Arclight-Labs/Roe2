import ip from "ip"
import axios from "axios"
import { WebsocketRoom } from "interface/ws"
import { setStore } from "./store.server"

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

export const initialize = async () => {
  setTimeout(
    async () => {
      try {
        console.log(`loading rooms from ${process.env.NODE_ENV}...`)
        const res = await ax.get<Record<string, WebsocketRoom>>(`/rooms`)
        if (res) {
          setStore((s) => ({ ...s, rooms: res.data || {} }))
          console.log("Rooms successfully loaded")
        }
      } catch (e) {
        console.log(e)
        console.error("Failed to initialize rooms. Retrying in 5 seconds...")
      }
    },
    isDev ? 30000 : 1000
  )
}
