import { showNotification } from "@mantine/notifications"
import { User } from "interface"
import { PropsWithChildren, useState } from "react"
import { useCookies } from "react-cookie"
import { userCreate, userLogin } from "utils/api"
import { userLogout } from "utils/api/queries"
import { queryClient } from "../../App"
import { authContext, authActions } from "./Auth.context"
const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [, , removeCookie] = useCookies(["token"])
  const [user, setUser] = useState<User | null>(null)

  const set = (user: User | null) => {
    setUser(user)
  }

  const logout = async () => {
    await userLogout()
    removeCookie("token")
    setUser(null)
    queryClient.removeQueries("authCheck")
  }

  const login = async (username: string, password: string) => {
    try {
      const user = await userLogin(username, password)
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
      const user = await userCreate(username, password)
      setUser(user)
      return user
    } catch (e: any) {
      const message = e?.response?.data?.message || ""
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
