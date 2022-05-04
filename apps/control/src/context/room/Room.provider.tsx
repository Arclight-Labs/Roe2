import { PropsWithChildren } from "react"
import RoomComponent from "../../comps/room/Room.component"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import RoomDataProvider from "./Room.provider.data"
import RoomNullProvider from "./Room.provider.null"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeRoom, setActiveRoom] = useActiveRoom()

  if (!activeRoom) {
    return (
      <RoomNullProvider>
        {/* {children} */}
        <RoomComponent />
      </RoomNullProvider>
    )
  }

  return <RoomDataProvider roomId={activeRoom.id}>{children}</RoomDataProvider>
}

export default RoomProvider
