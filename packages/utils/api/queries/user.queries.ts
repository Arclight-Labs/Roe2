import { AxiosInstance } from "axios"
import { User } from "interface/db"

export const userLogin =
  (ax: AxiosInstance) => async (username: string, password: string) => {
    const res = await ax.post<User>("/auth/login", { username, password })
    return res.data
  }

export const userLogout = (ax: AxiosInstance) => async () => {
  const res = await ax.post<User>("/auth/logout")
  return res.data
}

export const userCreate =
  (ax: AxiosInstance) => async (username: string, password: string) => {
    const res = await ax.post<User>("/user", { username, password })
    return res.data
  }

export const checkAuth = (ax: AxiosInstance) => async () => {
  const res = await ax.get<User>("/auth/me")
  return res.data
}
