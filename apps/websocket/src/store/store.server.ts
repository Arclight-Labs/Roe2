import { WebsocketStore } from "interface/ws"

import ip from "ip"
import axios from "axios"

const isDev = process.env.NODE_ENV === "development"
const devUrl = `http://${ip.address()}:5000/api`
// const devUrl = `http://${ip.address()}:5001/roe2-prod/us-central1/api)`
const prodUrl = "https://roe2.acadarena.com/api"

const ax = axios.create({
  baseURL: isDev ? devUrl : prodUrl,
})

export let store: WebsocketStore = {
  rooms: {},
}

export const initialize = async () => {
  const res = await ax.get<WebsocketStore>(`/rooms`)
  store = res.data
}
