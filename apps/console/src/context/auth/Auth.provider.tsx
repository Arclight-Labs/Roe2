import { showNotification } from "@mantine/notifications"
import { Cookie, User } from "interface"
import { PropsWithChildren, useState } from "react"
import { useCookies } from "react-cookie"
import { ax } from "../../App"
import { userCreate, userLogin, userLogout } from "utils/api/queries"
import { authContext, authActions } from "./Auth.context"

const fn = {
  userCreate: userCreate(ax),
  userLogin: userLogin(ax),
  userLogout: userLogout(ax),
}

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [, , removeCookie] = useCookies([Cookie.User])
  const [user, setUser] = useState<User | null>(null)

  const set = (user: User | null) => {
    setUser(user)
  }

  const logout = async () => {
    await fn.userLogout()
    removeCookie(Cookie.User)
    setUser(null)
  }

  const login = async (username: string, password: string) => {
    try {
      const user = await fn.userLogin(username, password)
      setUser(user)
      return user
    } catch (e: any) {
      showNotification({
        title: "Login failed",
        message: e?.response?.data?.message || "",
      })
    }
  }

  const create = async (username: string, password: string) => {
    try {
      const user = await fn.userCreate(username, password)
      setUser(user)
      return user
    } catch (e: any) {
      console
      const message = e?.response?.data?.message || e?.message || ""
      showNotification({
        title: "Signup failed",
        message,
      })
      throw new Error(message)
    }
  }

  return (
    <authContext.Provider value={user}>
      <authActions.Provider
        value={{
          set,
          login,
          logout,
          create,
        }}
      >
        {children}
      </authActions.Provider>
    </authContext.Provider>
  )
}
export default AuthProvider
