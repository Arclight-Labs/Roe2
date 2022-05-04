import { PropsWithChildren, useState } from "react"
import RoomProvider from "../../context/room/Room.provider"
const RoomGuard = ({ children }: PropsWithChildren<{}>) => {
  return <RoomProvider>{children}</RoomProvider>
}

export default RoomGuard
