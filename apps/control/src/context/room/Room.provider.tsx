import { useLocalStorage } from "@mantine/hooks"
import { Room } from "interface"
import { PropsWithChildren } from "react"
import RoomDataProvider from "./Room.provider.data"
import RoomNullProvider from "./Room.provider.null"

const RoomProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeRoom] = useLocalStorage<Room | null>({
    key: "activeRoom",
    defaultValue: null,
  })

  if (!activeRoom?.id) {
    return <RoomNullProvider>{children}</RoomNullProvider>
  }

  return <RoomDataProvider roomId={activeRoom.id}>{children}</RoomDataProvider>
}

export default RoomProvider
