import { DecodedIdToken } from "firebase-admin/auth"
import { NotifProps } from "interface"
import { Socket } from "socket.io"
import { getAuth } from "utils/firebase/firebase-admin.instance"
import { emitNotify } from "../emitters"
import { getRoom } from "../store"
import { getSocketRoom } from "./getSocketRoom.util"

export async function authenticate(
  accessToken: string = "",
  socket: Socket
): Promise<DecodedIdToken | void> {
  const auth = getAuth()

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
    if (!room.admins.includes(uid) && room.owner !== uid) {
      throw new Error("User don't have admin privileges")
    }

    return user
  } catch (e) {
    console.log(`[${socket.id}] error`, e)
    emitNotify(socket, {
      message: "Unable to authenticate your action",
      color: "red",
    })
    return
  }
}
