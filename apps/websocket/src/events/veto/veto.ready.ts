import { SocketEvent } from "interface/ws/SocketEvent.interface"
import { Veto, VetoReady, vetoReadySchema } from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getVeto, setVeto } from "../../store/services/veto.store.service"
import { authenticateVeto } from "../../utils/authenticateVeto.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoReadyFn = (
  props: VetoReady,
  seriesId: string,
  accessToken: string
) => Promise<void>

export const vetoReady: EventFn<VetoReadyFn> = (socket, io) => {
  return async (props, seriesId, accessToken) => {
    const res = vetoReadySchema.safeParse(props)
    if (!res.success)
      return emitNotify(socket, { message: "Invalid data", color: "red" })

    const { side, ready } = res.data

    const room = getSocketRoom(socket)
    if (!room) return

    // AUTHENTICATE
    const hasAccess = authenticateVeto(socket)(accessToken, seriesId, side)
    if (!hasAccess) {
      return emitNotify(socket, { message: "Access Denied", color: "red" })
    }

    const veto = getVeto(room, seriesId)
    if (!veto) {
      return emitNotify(socket, {
        message: "Veto is not enabled",
        color: "red",
      })
    }

    const readyCheck = veto.readyCheck
    readyCheck[side] = ready

    const newVeto: Veto = { ...veto, readyCheck }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, {
      matchId: seriesId,
      data: { veto: newVeto },
    })
  }
}
