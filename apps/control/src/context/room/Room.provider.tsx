import { PropsWithChildren } from "react"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import RoomSelect from "../../pages/RoomSelect"
import RoomDataProvider from "./Room.provider.data"
import RoomNullProvider from "./Room.provider.null"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeRoom, setActiveRoom] = useActiveRoom()

  if (!activeRoom) {
    return (
      <RoomNullProvider>
        <RoomSelect />
      </RoomNullProvider>
    )
  }

  return <RoomDataProvider roomId={activeRoom.id}>{children}</RoomDataProvider>
}

export default RoomProvider
