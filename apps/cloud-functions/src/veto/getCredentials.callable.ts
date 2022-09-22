import { Room } from "interface"
import { Broadcast } from "interface/ws/WebsocketStore.interface"
import { functions } from "../admin"
import { authCheck, Err } from "../utils"
import { runtimeOptions } from "../utils/cfRuntimeOptions"
import getOne from "../utils/fsGetOne"

interface Props {
  roomId: string
  seriesId: string
  type: "teamA" | "teamB" | "host"
}
export const getCredentials = functions
  .region("asia-east2")
  .runWith({ ...runtimeOptions, secrets: ["VETO_SECRET"] })
  .https.onCall(async (props: Props, context) => {
    const { uid } = authCheck(context.auth)
    const { z } = await import("zod")
    const AES = await import("crypto-js/aes")
    const utf8 = await import("crypto-js/enc-utf8")

    const schema = z.object({
      roomId: z.string(),
      seriesId: z.string(),
      type: z.enum(["teamA", "teamB", "host"]),
    })

    const res = schema.safeParse(props)
    if (!res.success) {
      throw new Err("invalid-argument", "Invalid data")
    }

    const { roomId, seriesId } = res.data

    // check if admin of room
    const snap = await getOne<Room>("rooms", roomId)
    const owner = snap.data().owner
    const admins = snap.data().admins
    if (!admins.includes(uid) && uid !== owner) {
      throw new Err("permission-denied", "Not admin of room")
    }

    // Check if veto is already set in series
    const broadcastPath = `rooms/${roomId}/live/broadcast`
    const broadcastSnapshot = await getOne<Broadcast>(broadcastPath)
    const broadcast = broadcastSnapshot.data()

    // Check if series exists
    const series = (broadcast?.matches ?? {})[seriesId]
    if (!series || !series?.veto) {
      throw new Err("not-found", "Veto is not yet set in series")
    }

    const passwords = series.veto.passwords
    const password = passwords[res.data.type]
    const secret = process.env.VETO_SECRET
    if (!password) throw new Err("not-found", "Veto not set")
    if (!secret) throw new Err("unimplemented", "Server error")
    return AES.decrypt(password, secret).toString(utf8)
  })
