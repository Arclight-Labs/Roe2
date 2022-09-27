import { SocketEvent } from "interface"
import {
  Veto,
  VetoActor,
  VetoJoin,
  vetoJoinSchema,
} from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getSeries, setSeries } from "../../store"
import { getRoom } from "../../store/services/room.store.service"
import { authenticateVeto } from "../../utils/authenticateVeto.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoJoinFn = (
  props: VetoJoin,
  seriesId: string,
  accessToken: string
) => Promise<void>

export const vetoJoinEvent: EventFn<VetoJoinFn> = (socket, io) => {
  return async (props, seriesId, accessToken) => {
    const res = vetoJoinSchema.safeParse(props)
    if (!res.success) {
      return emitNotify(socket, { message: "Invalid data", color: "red" })
    }
    const { name, type, uuid } = res.data
    const auth = authenticateVeto(socket)(accessToken, seriesId, type)
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
      console.log("veto secret not set")
      return emitNotify(socket, {
        message: "Veto secret not found",
        color: "red",
      })
    }

    const getActor = (id: string) =>
      veto.actors.find((actor) => actor.socketId === id || actor.uuid === id)

    const actors = getActor(uuid)
      ? veto.actors.map((actor) => {
          return actor.socketId !== socket.id && actor.uuid !== uuid
            ? actor
            : { ...actor, ...res.data }
        })
      : [...veto.actors, { name, type, socketId: socket.id, uuid } as VetoActor]

    const newVeto: Veto = { ...veto, actors }

    const newSeries = { ...series, veto: newVeto }
    const payload = { matchId: seriesId, data: newSeries }

    setSeries(room, seriesId, (series) => ({ ...series, veto: newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, payload)
  }
}
