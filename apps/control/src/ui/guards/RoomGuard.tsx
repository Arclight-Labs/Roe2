import { useLocalStorage } from "@mantine/hooks"
import { Room } from "interface"
import { PropsWithChildren, useState } from "react"
import { useCookies } from "react-cookie"
import { Navigate, useLocation } from "react-router-dom"
import Login from "../../pages/Login"

const RoomGuard = ({ children }: PropsWithChildren<{}>) => {
  const [activeRoom, setActiveRoom] = useLocalStorage<Room | null>({
    key: "activeRoom",
    defaultValue: null,
  })

  if (!activeRoom?.id) {
  }

  // const { pathname } = useLocation()
  // const [reqLocation, setReqLocation] = useState<string | null>(null)

  // if (!auth) return <Login />
  // if (reqLocation && pathname !== reqLocation) {
  //   setReqLocation(null)
  //   return <Navigate to={reqLocation} />
  // }

  return <>{children}</>
}

export default RoomGuard
