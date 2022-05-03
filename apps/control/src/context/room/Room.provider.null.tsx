import { PropsWithChildren } from "react"
import { roomContext } from "./Room.context"

const RoomNullProvider = ({ children }: PropsWithChildren<{}>) => (
  <roomContext.Provider value={null}>{children}</roomContext.Provider>
)

export default RoomNullProvider
