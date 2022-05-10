import { useAuth } from "../context/auth/Auth.hooks"
import { useRoom } from "../context/room/Room.hooks"

export const usePermission = () => {
  const room = useRoom()
  const { auth } = useAuth()

  const isAllowed =
    !!auth &&
    !!room &&
    (auth.uid === room.owner || (room.admins ?? []).includes(auth.uid))

  return isAllowed
}
