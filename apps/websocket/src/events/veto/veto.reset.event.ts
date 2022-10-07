import { SocketEvent } from "interface"
import { defaultCoinFlip } from "utils/general/defaultValues"
import { Veto, VetoSequence } from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { emitRoomNotify } from "../../emitters/notify.server.emit"
import { getSeries, setSeries } from "../../store"
import { getParticipantByChalId } from "../../store/services/participants.store.service"
import { getRoom } from "../../store/services/room.store.service"
import { authenticate } from "../../utils/authenticate.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoResetFn = (seriesId: string, accessToken: string) => Promise<void>

export const vetoReset: EventFn<VetoResetFn> = (socket, io) => {
  return async (seriesId, accessToken) => {
    const auth = await authenticate(accessToken, socket)
    if (!auth) return
    const room = getSocketRoom(socket)
    if (!room) return
    const roomData = getRoom(room)
    if (!roomData) return

    const series = getSeries(room, seriesId)
    const veto = series?.veto

    if (!series)
      return emitNotify(socket, { message: "Series not found", color: "red" })

    if (!veto)
      return emitNotify(socket, { message: "Veto not found", color: "red" })

    const secret = process.env.VETO_SECRET
    if (!secret) {
      return emitNotify(socket, {
        message: "Veto secret not found",
        color: "red",
      })
    }

    const newVeto: Veto = {
      ...veto,
      coinFlip: defaultCoinFlip,
      currentSequence: 0,
      readyCheck: {
        host: false,
        teamA: false,
        teamB: false,
      },
      sequence: veto.sequence.map<VetoSequence>((seq) => ({
        action: seq.action,
        mapActor: seq.mapActor,
        mapPicked: null,
        mapActorSide: null,
        mode: seq.mode,
        sidePicked: null,
        sideActor: seq.sideActor,
        status: "pending",
        description: seq.description || "",
      })),
    }

    const newSeries = { ...series, veto: newVeto }
    const payload = { matchId: seriesId, data: newSeries }

    const teams = {
      teamA: getParticipantByChalId(room, series.teamA.id)?.name || "TBD",
      teamB: getParticipantByChalId(room, series.teamB.id)?.name || "TBD",
    }

    setSeries(room, seriesId, (series) => ({ ...series, veto: newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, payload)
    emitRoomNotify(io, room, {
      title: "Veto Reset",
      message: `${teams.teamA} vs ${teams.teamB} veto has been reset`,
    })
  }
}
