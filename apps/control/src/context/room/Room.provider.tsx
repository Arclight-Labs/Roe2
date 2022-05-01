import { Room } from "interface"
import { PropsWithChildren, useState } from "react"
import { useQuery } from "react-query"
import { roomActions, roomContext } from "./Room.context"

const leave = async () => {
  // await userLogout()
}
const join = async (username: string, password: string) => {}

const actions = { leave, join }

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data: roomId } = useQuery("getCurrentRoom", (): string => {
    try {
      return window.localStorage.getItem("roomId") || ""
    } catch (error) {
      return ""
    }
  })

  if (!roomId) return <NullProvider loading={false}>{children}</NullProvider>

  const [room, setRoom] = useState<Room | null>(null)

  return (
    <roomContext.Provider value={room}>
      <roomActions.Provider value={actions}>{children}</roomActions.Provider>
    </roomContext.Provider>
  )
}
export default RoomProvider

const RoomDataProvider = ({
  children,
  roomId: string,
}: PropsWithChildren<{ roomId: string }>) => {}

const NullProvider = ({
  children,
  loading,
}: PropsWithChildren<{ loading: boolean }>) => (
  <roomContext.Provider value={null}>
    <roomActions.Provider value={actions}>{children}</roomActions.Provider>
  </roomContext.Provider>
)
