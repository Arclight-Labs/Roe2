import axios from "axios"

const host = window.location.hostname
const port = 1400

export default axios.create({
  baseURL: `http://${host}:${port}`,
  withCredentials: true,
})
