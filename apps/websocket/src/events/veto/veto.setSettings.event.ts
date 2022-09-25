import { randomUUID } from "crypto"
import AES from "crypto-js/aes"
import { SocketEvent } from "interface"
import { defaultVeto } from "utils/general/defaultValues"
import {
  Veto,
  VetoSequence,
  VetoSettings,
  vetoSettingsSchema,
} from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getSeries, setSeries } from "../../store"
import { getRoom } from "../../store/services/room.store.service"
import { authenticate } from "../../utils/authenticate.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { EventFn } from "../event.hoc"

type VetoSetSettingsFn = (
  props: VetoSettings,
  seriesId: string,
  accessToken: string
) => Promise<void>

export const vetoSetSettings: EventFn<VetoSetSettingsFn> = (socket, io) => {
  return async (props, seriesId, accessToken) => {
    const auth = await authenticate(accessToken, socket)
    if (!auth) return
    const room = getSocketRoom(socket)
    if (!room) return
    const roomData = getRoom(room)
    if (!roomData) return

    const res = vetoSettingsSchema.safeParse(props)
    if (!res.success) {
      return emitNotify(socket, { message: "Invalid data", color: "red" })
    }

    const series = getSeries(room, seriesId)
    const veto = series?.veto

    if (!series)
      return emitNotify(socket, { message: "Series not found", color: "red" })

    const secret = process.env.VETO_SECRET
    if (!secret) {
      return emitNotify(socket, {
        message: "Veto secret not found",
        color: "red",
      })
    }

    const newVeto: Veto = {
      ...(veto ?? defaultVeto),
      settings: res.data,
      currentSequence: 0,
      passwords: {
        teamA:
          veto?.passwords?.teamA ||
          AES.encrypt(randomUUID(), secret).toString(),
        teamB:
          veto?.passwords?.teamB ||
          AES.encrypt(randomUUID(), secret).toString(),
        host:
          veto?.passwords?.host || AES.encrypt(randomUUID(), secret).toString(),
      },
      sequence: res.data.sequence.map<VetoSequence>((seq) => ({
        action: seq.action,
        mapActor: seq.mapActor,
        mapPicked: null,
        mapActorSide: null,
        mode: seq.mode,
        sidePicked: null,
        sideActor: seq.sideActor,
        status: "pending",
      })),
    }

    const newSeries = { ...series, veto: newVeto }
    const payload = { matchId: seriesId, data: newSeries }

    setSeries(room, seriesId, (series) => ({ ...series, veto: newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, payload)
    emitNotify(socket, {
      message: "Veto settings updated",
    })
  }
}
