import { useEffect } from "react"
import { useWsAction } from "utils/socket"
import { useParams } from "react-router-dom"

type Params = Record<"roomId", string>

const useRoom = () => {
  const { roomId = "allg" } = useParams<Params>()
  const { joinRoom } = useWsAction()
  useEffect(() => {
    if (!roomId) return
    joinRoom({
      roomId,
      roomName: "Alliance Games",
      username: "Overlay",
    })
  }, [roomId])
}
export default useRoom
