import { PropsWithChildren, useEffect } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { getRoomRef } from "utils/firebase/room.queries"
import { useWsAction } from "utils/socket"
import { roomContext } from "./Room.context"

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
