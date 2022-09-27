import { PropsWithChildren, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useWsAction } from "utils/socket"

type Params = Record<"roomId", string>

type UseRoomProps = string | undefined
const useParamRoom = (customRoomId?: UseRoomProps) => {
  const { roomId = "allg" } = useParams<Params>()
  const { joinRoom } = useWsAction()
  useEffect(() => {
    if (!roomId) return
    joinRoom({
      roomId: customRoomId || roomId,
      roomName: "Alliance Games",
      username: "Overlay",
    })
  }, [roomId])
}
export default useParamRoom

export const ParamRoomProvider = ({ children }: PropsWithChildren<object>) => {
  useParamRoom()
  return <>{children}</>
}
