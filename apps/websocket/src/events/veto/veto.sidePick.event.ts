import { SocketEvent } from "interface/ws/SocketEvent.interface"
import { defaultVetoMode } from "utils/general/defaultValues"
import {
  Veto,
  VetoMap,
  VetoSidePick as VetoSidePickSchema,
  vetoSidePickSchema,
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
    if (!res.success) {
      console.log(res.error)
      return emitNotify(socket, {
        message: "Invalid data",
        color: "red",
      })
    }

    const { seriesId, team, side } = res.data

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

    const { veto } = series
    if (!veto) {
      return emitNotify(socket, {
        message: "Veto is not enabled",
        color: "red",
      })
    }
    let currentSequence = veto.currentSequence
    const sequenceItem = veto.sequence[currentSequence]
    if (!sequenceItem || !sequenceItem.sideActor) {
      return emitNotify(socket, {
        message: "Invalid veto sequence",
        color: "red",
      })
    }

    /**
     *  Check if `team` is the mapPicker based on coin flip result
     */
    if (
      sequenceItem.sideActor !== "random" &&
      team !== veto.coinFlip[sequenceItem.sideActor]
    ) {
      return emitNotify(socket, {
        message: "You are not the side picker",
        color: "red",
      })
    }

    // Check status is awaiting for map pick
    if (sequenceItem.status !== "awaitingSidePick") {
      return emitNotify(socket, {
        message: "It's not your turn yet",
        color: "red",
      })
    }

    const sequence = veto.sequence

    const reverseSide = (side: "red" | "blue") => {
      return side === "red" ? "blue" : "red"
    }

    for (let i = 0; i < sequence.length; i++) {
      if (i === veto.currentSequence) {
        sequence[i].sidePicked = side
        sequence[i].mapActorSide = reverseSide(side)
        sequence[i].status = "complete"

        const nextSeq = sequence[i + 1]
        if (nextSeq) {
          nextSeq.status = "awaitingMapPick"
        }
        currentSequence = currentSequence + 1
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

    const selectRandomSide = () => {
      return Math.random() >= 0.5 ? "red" : "blue"
    }

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

    const newVeto: Veto = { ...veto, currentSequence, sequence }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, {
      matchId: seriesId,
      data: { veto: newVeto },
    })
  }
}
