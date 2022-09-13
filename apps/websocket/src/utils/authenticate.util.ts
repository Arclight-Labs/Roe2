import { DecodedIdToken } from "firebase-admin/auth"
import { NotifProps } from "interface"
import { Socket } from "socket.io"
import { adminAuth } from "utils/firebase/firebase-admin.instance"
import { emitNotify } from "../emitters"
import { getRoom } from "../store"
import { getSocketRoom } from "./getSocketRoom.util"

export async function authenticate(
  accessToken: string = "",
  socket: Socket
): Promise<DecodedIdToken | void> {
  const auth = adminAuth()

  const notif: NotifProps = {
    message: "You don't have access",
    title: "Error",
    color: "red",
  }

  try {
    if (!accessToken) throw emitNotify(socket, notif)
    const roomId = getSocketRoom(socket)
    if (!roomId) throw new Error(`Unable to find room`)
    const room = getRoom(roomId)
    if (!room) throw new Error(`Unable to get room data for ${roomId}`)

    const user = await auth.verifyIdToken(accessToken)
    const { uid } = user
    if (!room.admins.includes(uid) && room.owner !== uid)
      throw emitNotify(socket, notif)

    return user
  } catch (e) {
    console.log(`[${socket.id}] error`, e)
    return
  }
}
