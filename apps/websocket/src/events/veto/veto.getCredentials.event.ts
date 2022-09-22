import crypto from "crypto-js"
import { SocketEvent } from "interface"
import { emitNotify } from "../../emitters"
import { getRoom } from "../../store/services/room.store.service"
import { getVeto } from "../../store/services/veto.store.service"
import { authenticate } from "../../utils/authenticate.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { getVetoSecret } from "../../utils/vetoSecret.util"
import { EventFn } from "../event.hoc"

type GetCredentials = (seriesId: string, accessToken: string) => Promise<void>

export const vetoGetCredentials: EventFn<GetCredentials> = (socket, io) => {
  return async (seriesId, accessToken) => {
    const auth = await authenticate(accessToken, socket)
    if (!auth) return
    const room = getSocketRoom(socket)
    if (!room) return
    const roomData = getRoom(room)
    if (!roomData) return

    const veto = getVeto(room, seriesId)
    const secret = getVetoSecret()

    if (!veto) {
      return emitNotify(socket, { message: "Veto not found", color: "red" })
    }

    const { teamA, teamB, host } = veto.passwords

    const payload = {
      teamA: crypto.AES.decrypt(teamA, secret).toString(crypto.enc.Utf8),
      teamB: crypto.AES.decrypt(teamB, secret).toString(crypto.enc.Utf8),
      host: crypto.AES.decrypt(host, secret).toString(crypto.enc.Utf8),
    }

    io.to(room).emit(SocketEvent.VetoRequestCredentialsResponse, payload)
  }
}
