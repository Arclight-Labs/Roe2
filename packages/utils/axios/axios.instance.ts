import axios from "axios"

export const ax = axios.create({
  baseURL: "https://waypoint-api.acadarena.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

// export const ax2 = axios.create({
//   baseURL: "https://roe2.acadarena.com",
// })
