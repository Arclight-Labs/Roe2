import axios, { AxiosResponse } from "axios"
import { Room, User } from "interface/db"
import { runAsync } from "../hooks"

export const ax = axios.create({
  baseURL: "http://localhost:1400",
  withCredentials: true,
})

interface JoinRoom {
  username: string
  password: string
}
export const joinRoom = async (props: JoinRoom) => {
  const res = await ax.post<Room>("/room/join", props)
  return res.data
}

// ============ User Queries

export const userLogin = async (username: string, password: string) => {
  const res = await ax.post<User>("/auth/login", { username, password })
  return res.data
}

export const userLogout = async () => {
  const res = await ax.post<User>("/auth/logout")
  return res.data
}
export const userCreate = async (username: string, password: string) => {
  const res = await ax.post<User>("/user", { username, password })
  return res.data
}

export const checkAuth = async () => {
  const res = await ax.get<User>("/auth/me")
  return res.data
}
