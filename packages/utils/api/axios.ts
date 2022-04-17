import axios from "axios"

export default axios.create({
  baseURL: "http://localhost:1400",
  withCredentials: true,
})
