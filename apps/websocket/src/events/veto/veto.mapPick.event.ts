import { SocketEvent } from "interface/ws/SocketEvent.interface"
import {
  Veto,
  VetoMapPickSchema,
  vetoMapPickSchema,
} from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getVeto, setVeto } from "../../store/services/veto.store.service"
import { authenticateVeto } from "../../utils/authenticateVeto.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoMapPick = (
  props: VetoMapPickSchema,
  accessToken: string
) => Promise<void>

export const vetoMapPick: EventFn<VetoMapPick> = (socket, io) => {
  return async (props, accessToken) => {
    const res = vetoMapPickSchema.safeParse(props)
    if (!res.success)
      return emitNotify(socket, { message: "Invalid data", color: "red" })

    const { map, seriesId, team, vetoSequence } = res.data

    const room = getSocketRoom(socket)
    if (!room) return

    // AUTHENTICATE
    const hasAccess = authenticateVeto(socket)(accessToken, seriesId, team)
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

    const sequence = veto.sequence[vetoSequence]
    if (
      veto.currentSequence !== vetoSequence ||
      !vetoSequence ||
      !sequence.mapActor
    ) {
      return emitNotify(socket, {
        message: "Invalid veto sequence",
        color: "red",
      })
    }

    /**
     *  Check if `team` is the MapActor based on coin flip result
     */
    if (team !== veto.coinFlip[sequence.mapActor]) {
      return emitNotify(socket, {
        message: "You are not the map picker",
        color: "red",
      })
    }

    // Check status is awaiting for map pick
    if (sequence.status !== "awaitingMapPick") {
      return emitNotify(socket, {
        message: "It's not your turn yet",
        color: "red",
      })
    }

    // Check if map is already banned or picked in the same mode
    const mapNotAvailable = veto.sequence.some(
      (seq) => seq.mapPicked === map && sequence.mode === seq.mode
    )

    if (!mapNotAvailable) {
      return emitNotify(socket, {
        message: "Map has already been picked",
        color: "red",
      })
    }

    const newVeto: Veto = {
      ...veto,
      sequence: veto.sequence.map((seq, index) => {
        if (index === vetoSequence)
          return { ...seq, mapPicked: map, status: "awaitingSidePick" }
        return seq
      }),
    }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, { matchId: seriesId, veto: newVeto })
  }
}
