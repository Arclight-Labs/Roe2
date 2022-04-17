import { User } from "interface/db"
import ax from "../axios"

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
