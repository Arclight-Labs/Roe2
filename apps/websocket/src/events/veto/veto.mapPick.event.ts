import { SocketEvent } from "interface/ws/SocketEvent.interface"
import { defaultVetoMode } from "utils/general/defaultValues"
import {
  Veto,
  VetoMap,
  VetoMapPick as VetoMapPickSchema,
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

    const { map, seriesId, team } = res.data

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

    let currentSequence = veto.currentSequence

    const sequenceItem = veto.sequence[veto.currentSequence]
    if (!sequenceItem.mapActor) {
      return emitNotify(socket, {
        message: "Invalid veto sequence",
        color: "red",
      })
    }

    /**
     *  Check if `team` is the MapActor based on coin flip result
     */
    if (team !== veto.coinFlip[sequenceItem.mapActor]) {
      return emitNotify(socket, {
        message: "You are not the map picker",
        color: "red",
      })
    }

    // Check status is awaiting for map pick
    console.log("veto.status", sequenceItem.status)
    if (sequenceItem.status !== "awaitingMapPick") {
      return emitNotify(socket, {
        message: "It's not your turn yet",
        color: "red",
      })
    }

    // Check if map is already banned or picked in the same mode
    const mapNotAvailable = veto.sequence.some(
      (seq) =>
        seq.mapPicked !== null &&
        seq.mapPicked === map &&
        sequenceItem.mode === seq.mode
    )

    if (mapNotAvailable) {
      return emitNotify(socket, {
        message: "Map has already been picked",
        color: "red",
      })
    }

    const sequence = veto.sequence

    const selectRandomSide = () => {
      return Math.random() >= 0.5 ? "red" : "blue"
    }

    for (let i = 0; i < sequence.length; i++) {
      const seq = sequence[i]
      if (i === veto.currentSequence) {
        sequence[i].mapPicked = map
        sequence[i].status =
          seq.action === "pick" ? "awaitingSidePick" : "complete"
        sequence[i].sidePicked =
          seq.sideActor === "random"
            ? selectRandomSide()
            : sequence[i].sidePicked
        const nextSeq = sequence[i + 1]
        if (nextSeq) {
          sequence[i + 1].status =
            seq.action === "ban" ? "awaitingMapPick" : sequence[i + 1].status
        }
        if (seq.action !== "pick") {
          currentSequence = currentSequence + 1
        }
      }
    }

    const getModeMapPool = (modeId: string) => {
      const mode =
        veto.settings.modes.find(({ id }) => id === modeId) || defaultVetoMode
      const maps: VetoMap[] = []
      const mapIds = mode.mapPool ?? []
      for (const mapId of mapIds) {
        const map = veto.settings.mapPool.find(({ id }) => id === mapId)
        if (map) maps.push(map)
      }
      return maps
    }

    const mapPool = (index: number) => {
      const seq = sequence[index]
      if (!seq) return []
      const initialPool = seq.mode
        ? getModeMapPool(seq.mode)
        : veto.settings.mapPool
      return initialPool.filter(
        (map) =>
          !sequence
            .filter(({ mapPicked, mode }) => !!mapPicked && mode === seq.mode)
            .find(({ mapPicked }) => mapPicked === map.id)
      )
    }

    const reverseSide = (side: "red" | "blue") => {
      return side === "red" ? "blue" : "red"
    }

    if (sequenceItem.action !== "pick") {
      while (
        sequence[currentSequence] &&
        sequence[currentSequence].action === "decider" &&
        sequence[currentSequence].status !== "awaitingSidePick"
      ) {
        const randomSide = selectRandomSide()
        const nextSeq = sequence[currentSequence]
        const pool = mapPool(currentSequence).map(({ id }) => id)
        nextSeq.mapPicked = pool[Math.floor(Math.random() * pool.length)]
        nextSeq.status =
          nextSeq.sideActor === "random" ? "complete" : "awaitingSidePick"
        nextSeq.mapActorSide =
          nextSeq.sideActor === "random"
            ? reverseSide(randomSide)
            : nextSeq.mapActorSide
        nextSeq.sidePicked =
          nextSeq.sideActor === "random" ? randomSide : nextSeq.sidePicked
        currentSequence =
          currentSequence + (nextSeq.sideActor === "random" ? 1 : 0)
        if (nextSeq.sideActor === "random" && sequence[currentSequence]) {
          sequence[currentSequence].status = "awaitingMapPick"
        }
      }
    }

    const newVeto: Veto = { ...veto, sequence, currentSequence }
    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, {
      matchId: seriesId,
      data: { veto: newVeto },
    })
  }
}
