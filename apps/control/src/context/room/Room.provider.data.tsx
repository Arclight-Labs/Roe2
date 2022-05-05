import { PropsWithChildren, useEffect } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { getRoomRef } from "utils/firebase/room.queries"
import { useWsAction } from "utils/socket"
import { useAuth } from "../auth/Auth.hooks"
import { roomContext } from "./Room.context"
import RoomNullProvider from "./Room.provider.null"

const RoomDataProvider = ({
  children,
  roomId,
}: PropsWithChildren<{ roomId: string }>) => {
  const [data] = useDocumentData(getRoomRef(roomId))
  const { user } = useAuth()
  const { joinRoom } = useWsAction()

  useEffect(() => {
    if (!data || !user) return
    joinRoom({ roomId: data.id, roomName: data.name, username: user.username })
  }, [data, user])
  if (!data) {
    return <RoomNullProvider>{children}</RoomNullProvider>
  }

  return <roomContext.Provider value={data}>{children}</roomContext.Provider>
}

export default RoomDataProvider
