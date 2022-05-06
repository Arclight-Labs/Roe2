import axios from "axios"

export const ax = axios.create({
  baseURL: "https://waypoint-api.acadarena.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
