import { SocketEvent } from "interface/ws/SocketEvent.interface"
import {
  Veto,
  vetoSidePickSchema,
  VetoSidePickSchema,
} from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getSeries } from "../../store"
import { setVeto } from "../../store/services/veto.store.service"
import { authenticateVeto } from "../../utils/authenticateVeto.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoSidePick = (
  props: VetoSidePickSchema,
  accessToken: string
) => Promise<void>

export const vetoSidePick: EventFn<VetoSidePick> = (socket, io) => {
  return async (props, accessToken) => {
    const res = vetoSidePickSchema.safeParse(props)
    if (!res.success)
      return emitNotify(socket, {
        message: "Invalid data",
        color: "red",
      })

    const { vetoSequence, seriesId, team, side } = res.data

    const room = getSocketRoom(socket)
    if (!room) return

    const hasAccess = authenticateVeto(socket)(accessToken, seriesId, team)
    if (!hasAccess) {
      return emitNotify(socket, {
        message: "Access Denied",
        color: "red",
      })
    }

    const series = getSeries(room, seriesId)
    if (!series) {
      return emitNotify(socket, {
        message: "Series not found",
        color: "red",
      })
    }

    if (!series.veto) {
      return emitNotify(socket, {
        message: "Veto is not enabled",
        color: "red",
      })
    }

    const { veto } = series
    const sequence = veto.sequence[vetoSequence]
    if (
      veto.currentSequence !== vetoSequence ||
      !vetoSequence ||
      !sequence.sideActor
    ) {
      return emitNotify(socket, {
        message: "Invalid veto sequence",
        color: "red",
      })
    }

    /**
     *  Check if `team` is the mapPicker based on coin flip result
     */
    if (team !== veto.coinFlip[sequence.sideActor]) {
      return emitNotify(socket, {
        message: "You are not the side picker",
        color: "red",
      })
    }

    // Check status is awaiting for map pick
    if (sequence.status !== "awaitingSidePick") {
      return emitNotify(socket, {
        message: "It's not your turn yet",
        color: "red",
      })
    }

    const nextIndex = vetoSequence + 1

    const newVeto: Veto = {
      ...veto,
      currentSequence: nextIndex,
      sequence: veto.sequence.map((seq, index) => {
        if (index === vetoSequence)
          return {
            ...seq,
            sidePicked: side,
            mapPickerSide:
              side !== null ? (side === "red" ? "blue" : "red") : null,
            status: "complete",
          }
        if (index === nextIndex) {
          return { ...seq, status: "awaitingMapPick" }
        }
        return seq
      }),
    }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, { matchId: seriesId, veto: newVeto })
  }
}
