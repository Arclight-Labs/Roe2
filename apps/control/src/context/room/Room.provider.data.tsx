import { PropsWithChildren } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { getRoomRef } from "utils/firebase/room.queries"
import { roomContext } from "./Room.context"
import RoomNullProvider from "./Room.provider.null"

const RoomDataProvider = ({
  children,
  roomId,
}: PropsWithChildren<{ roomId: string }>) => {
  const [data] = useDocumentData(getRoomRef(roomId))

  if (!data) {
    return <RoomNullProvider>{children}</RoomNullProvider>
  }

  return <roomContext.Provider value={data}>{children}</roomContext.Provider>
}

export default RoomDataProvider
