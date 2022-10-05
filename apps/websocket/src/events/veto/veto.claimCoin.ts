import { SocketEvent } from "interface/ws/SocketEvent.interface"
import {
  CoinFlip,
  Veto,
  VetoClaimCoin,
  vetoClaimCoinSchema,
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

export const vetoClaimCoin: EventFn<VetoClaimCoinFn> = (socket, io) => {
  return async (props, seriesId, accessToken) => {
    const res = vetoClaimCoinSchema.safeParse(props)
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

    const opposingTeamReady = !!veto.readyCheck[opposingTeam(teamSide)]

    if (!opposingTeamReady)
      return emitNotify(socket, {
        message: "Opposing team is not ready",
        color: "red",
      })

    const flipACoin = () => {
      return Math.random() >= 0.5 ? "heads" : "tails"
    }

    const coinFlip: CoinFlip = {
      heads: coinSide === "heads" ? teamSide : opposingTeam(teamSide),
      tails: coinSide === "tails" ? teamSide : opposingTeam(teamSide),
      result: null,
      loser: null,
      winner: null,
    }

    if (veto.settings.autoStart) {
      const result = flipACoin()
      coinFlip.result = result
      coinFlip.loser = coinSide === result ? opposingTeam(teamSide) : teamSide
      coinFlip.winner = coinSide === result ? teamSide : opposingTeam(teamSide)
      veto.sequence[0].status = "awaitingMapPick"
    }

    const newVeto: Veto = { ...veto, coinFlip }

    setVeto(room, seriesId, (veto) => ({ ...veto, ...newVeto }))
    io.to(room).emit(SocketEvent.SetMatch, {
      matchId: seriesId,
      data: { veto: newVeto },
    })
  }
}
