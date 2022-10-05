import { SanitizedParticipant } from "interface/waypoint"
import { useLocation, useParams } from "react-router-dom"
import { defaultSeries, parseQueryString } from "utils/general"
import {
  defaultCoinFlip,
  defaultReadyCheck,
  defaultVeto,
  defaultVetoSettings,
} from "utils/general/defaultValues"
import { useMatches, useParticipants } from "utils/hooks"
import { VetoPasswordType } from "utils/schema/veto.schema"

type Params = Record<"roomId" | "seriesId", string>
type Query = { type: VetoPasswordType; accessToken: string }
interface CoinResult {
  winner: SanitizedParticipant | null
  loser: SanitizedParticipant | null
  teamA: "winner" | "loser" | null
  teamB: "winner" | "loser" | null
}

export const useVeto = () => {
  const { search } = useLocation()
  const { accessToken, type: side } = parseQueryString(search) as Query
  const { seriesId = "" } = useParams<Params>()
  const { getMatch } = useMatches()
  const { getTeam } = useParticipants()
  const match = getMatch(seriesId) || defaultSeries
  const veto = match.veto
  const {
    sequence,
    currentSequence,
    coinFlip = defaultCoinFlip,
    readyCheck = defaultReadyCheck,
    settings = defaultVetoSettings,
  } = veto || defaultVeto

  const getMode = (id: string | null) => {
    return settings.modes.find((mode) => mode.id === id) || null
  }

  const getMap = (id: string | null) => {
    return settings.mapPool.find((map) => map.id === id) || null
  }

  const sequenceItem = sequence[currentSequence]

  const teams = {
    teamA: getTeam(seriesId, "teamA"),
    teamB: getTeam(seriesId, "teamB"),
  }

  const coinResult: CoinResult = {
    winner: (coinFlip.winner && teams[coinFlip.winner]) || null,
    loser: (coinFlip.loser && teams[coinFlip.loser]) || null,
    teamA:
      coinFlip.winner === "teamA"
        ? "winner"
        : coinFlip.loser === "teamA"
        ? "loser"
        : null,
    teamB:
      coinFlip.winner === "teamB"
        ? "winner"
        : coinFlip.loser === "teamB"
        ? "loser"
        : null,
  }

  const getTeamCoinStatus = (team?: "teamA" | "teamB" | "host") => {
    if (!team || team === "host") return
    return (
      coinResult[team] ||
      (coinFlip.heads === team
        ? "picked heads"
        : coinFlip.tails === team
        ? "picked tails"
        : "pending")
    )
  }

  const coinStatus = coinFlip.result ? `${coinFlip.result} wins` : "pending"
  const activeTeam = !!side && side !== "host" ? teams[side] : null
  const activeTeamCoinStatus = getTeamCoinStatus(side)
  const activeTeamCoinResult = side === "host" ? null : coinResult[side]
  const isActiveTeamReady = (side !== "host" && !!readyCheck[side]) || false
  const isOpponentReady =
    side !== "host" && !!readyCheck[side === "teamA" ? "teamB" : "teamA"]

  const isYourTurn = (): boolean => {
    if (!sequenceItem || side === "host") {
      return false
    }

    switch (sequenceItem.status) {
      case "pending":
        return (
          !!sequenceItem.mapActor &&
          sequenceItem.mapActor === activeTeamCoinResult
        )
      case "awaitingMapPick":
        return (
          !!sequenceItem.mapActor &&
          sequenceItem.mapActor === activeTeamCoinResult
        )
      case "awaitingSidePick":
        return (
          !!sequenceItem.sideActor &&
          sequenceItem.sideActor === activeTeamCoinResult
        )
      default:
        return false
    }
  }

  const isHostReady = readyCheck.host || !!settings.autoStart
  const readyToFlip = isActiveTeamReady && isOpponentReady && isHostReady
  const isComplete = () => {
    return sequence.every((item) => item.status === "complete")
  }

  return {
    veto,
    match,
    teams,
    coinResult,
    activeTeam,
    activeTeamCoinStatus,
    side: side as VetoPasswordType,
    opponent: side === "teamA" ? "teamB" : "teamA",
    accessToken,
    seriesId,
    isActiveTeamReady,
    isOpponentReady,
    readyToFlip,
    isYourTurn,
    coinStatus,
    coinFlip,
    readyCheck,
    settings,
    currentSequence,
    sequence,
    sequenceItem,
    isComplete,
    getMode,
    getMap,
  }
}
