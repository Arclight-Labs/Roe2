import { PropsWithChildren } from "react"
import { useActiveRoom } from "../../hooks/useActiveRoom.hook"
import RoomSelect from "../../pages/RoomSelect"
import AppShellWrapper from "../../ui/AppShellWrapper"
import RoomDataProvider from "./Room.provider.data"
import RoomNullProvider from "./Room.provider.null"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeRoom, setActiveRoom] = useActiveRoom()

  if (!activeRoom) {
    return (
      <RoomNullProvider>
        <AppShellWrapper>
          <RoomSelect />
        </AppShellWrapper>
      </RoomNullProvider>
    )
  }

  return <RoomDataProvider roomId={activeRoom.id}>{children}</RoomDataProvider>
}

export default RoomProvider
