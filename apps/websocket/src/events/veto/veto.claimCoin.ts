import { SocketEvent } from "interface/ws/SocketEvent.interface"
import {
  CoinFlip,
  Veto,
  vetoClaimCoin,
  VetoClaimCoin,
} from "utils/schema/veto.schema"
import { emitNotify } from "../../emitters"
import { getVeto, setVeto } from "../../store/services/veto.store.service"
import { authenticateVeto } from "../../utils/authenticateVeto.util"
import { getSocketRoom } from "../../utils/getSocketRoom.util"
import { opposingTeam } from "../../utils/opposingTeam.util"
import { EventFn } from "../event.hoc"

type VetoClaimCoinFn = (
  props: VetoClaimCoin,
  seriesId: string,
  accessToken: string
) => Promise<void>

export const vetoMapPick: EventFn<VetoClaimCoinFn> = (socket, io) => {
  return async (props, seriesId, accessToken) => {
    const res = vetoClaimCoin.safeParse(props)
    if (!res.success)
      return emitNotify(socket, { message: "Invalid data", color: "red" })

    const { coinSide, teamSide } = res.data

    const room = getSocketRoom(socket)
    if (!room) return

    // AUTHENTICATE
    const hasAccess = authenticateVeto(socket)(accessToken, seriesId, teamSide)
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

    if (!!veto.coinFlip.heads && !!veto.coinFlip.tails) {
      return emitNotify(socket, {
        message: "Coin sides has already been determined",
        color: "red",
      })
    }

    const opposingTeamReady = !!(veto.actors ?? []).some(
      (actor) => actor.type === opposingTeam(teamSide) && actor.ready
    )

    if (!opposingTeamReady)
      return emitNotify(socket, {
        message: "Opposing team is not ready",
        color: "red",
      })

    const coinFlip: CoinFlip = {
      heads: coinSide === "heads" ? teamSide : opposingTeam(teamSide),
      tails: coinSide === "tails" ? teamSide : opposingTeam(teamSide),
      result: null,
      loser: null,
      winner: null,
    }

    const newVeto: Veto = { ...veto, coinFlip }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, { matchId: seriesId, veto: newVeto })
  }
}
