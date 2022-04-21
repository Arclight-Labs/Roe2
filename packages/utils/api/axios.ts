import axios from "axios"

export default function ax(host = "0.0.0.0", port = 1400) {
  return axios.create({
    baseURL: `http://${host}:${port}`,
    withCredentials: true,
  })
}
