import { showNotification } from "@mantine/notifications"
import { Cookie, Room, User } from "interface"
import { PropsWithChildren, useState } from "react"
import { useCookies } from "react-cookie"
import { userCreate, userLogin, userLogout } from "utils/api/queries"
import { queryClient } from "../../App"
import { roomContext, roomActions } from "./Room.context"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [, , removeCookie] = useCookies([Cookie.Room])
  const [user, setUser] = useState<User | null>(null)

  const set = (room: Partial<Room>) => {
    // setRoom(room)
  }

  const logout = async () => {
    // await userLogout()
    removeCookie(Cookie.Room)
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
    <roomContext.Provider value={user}>
      <roomActions.Provider
        value={{
          login,
          logout,
          create,
          set,
        }}
      >
        {children}
      </roomActions.Provider>
    </roomContext.Provider>
  )
}
export default RoomProvider
