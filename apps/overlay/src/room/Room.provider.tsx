import { PropsWithChildren, useEffect } from "react"
import { useWsAction } from "utils/socket"

const RoomProvider = ({
  children,
  roomId,
}: PropsWithChildren<{ roomId: string }>) => {
  const { joinRoom } = useWsAction()
  useEffect(() => {
    joinRoom({ roomId, roomName: "", username: "Overlay" })
  }, [])
  return children
}

export default RoomProvider
