import { showNotification } from "@mantine/notifications"
import { Cookie, Room, User } from "interface"
import { PropsWithChildren, useState } from "react"
import { useCookies } from "react-cookie"
import { roomContext, roomActions } from "./Room.context"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [, , removeCookie] = useCookies([Cookie.Room])
  const [room, setRoom] = useState<Room | null>(null)

  // const set = (room: Partial<Room>) => {
  //   setRoom(room)
  // }

  const leave = async () => {
    // await userLogout()
    removeCookie(Cookie.Room)
    setRoom(null)
  }

  const join = async (username: string, password: string) => {
    // try {
    //   const room = await fn.joinRoom({ username, password })
    //   setRoom(room)
    //   return room
    // } catch (e: any) {
    //   showNotification({
    //     title: "Login failed",
    //     message: e?.response?.data?.message || "",
    //   })
    // }
  }

  return (
    <roomContext.Provider value={room}>
      <roomActions.Provider
        value={{
          join,
          leave,
        }}
      >
        {children}
      </roomActions.Provider>
    </roomContext.Provider>
  )
}
export default RoomProvider
