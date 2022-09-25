import { useLocalStorage } from "@mantine/hooks"
import { useLocation, useParams } from "react-router-dom"
import { defaultSeries, parseQueryString } from "utils/general"
import { useMatches, useParticipants } from "utils/hooks"
import { VetoPasswordType } from "utils/schema/veto.schema"
import { useActiveSocket } from "utils/socket/Socket.hooks"

type Params = Record<"roomId" | "seriesId", string>
type Query = { type: VetoPasswordType; accessToken: string }

export const useVeto = () => {
  const socket = useActiveSocket()
  const [{ uuid }] = useLocalStorage<{ name: string; uuid: string }>({
    key: "vetoActor",
    defaultValue: { name: "", uuid: "" },
  })
  const { search } = useLocation()
  const { accessToken, type: side } = parseQueryString(search) as Query
  const { seriesId = "" } = useParams<Params>()
  const { getMatch } = useMatches()
  const { getTeam } = useParticipants()
  const match = getMatch(seriesId) || defaultSeries
  const { veto } = match
  const actors = veto?.actors || []

  const getActor = (id: string = "") => {
    return (
      actors.find((actor) => actor.socketId === id || actor.uuid === id) || null
    )
  }

  const teams = {
    teamA: getTeam(seriesId, "teamA"),
    teamB: getTeam(seriesId, "teamB"),
  }

  const getTeamCoinStatus = (team?: "teamA" | "teamB" | "host") => {
    if (!team || team === "host") return
    return coinResult[team] || veto?.coinFlip?.heads === team
      ? "picked heads"
      : veto?.coinFlip?.tails === team
      ? "picked tails"
      : "pending"
  }

  const coinResult = {
    winner: (veto?.coinFlip?.winner && teams[veto?.coinFlip?.winner]) || null,
    loser: (veto?.coinFlip?.loser && teams[veto?.coinFlip?.loser]) || null,
    teamA:
      veto?.coinFlip?.winner === "teamA"
        ? "winner"
        : veto?.coinFlip?.loser === "teamA"
        ? "loser"
        : null,
    teamB:
      veto?.coinFlip?.winner === "teamB"
        ? "winner"
        : veto?.coinFlip?.loser === "teamB"
        ? "loser"
        : null,
  }

  const activeActor = getActor(uuid || socket.id)
  const activeTeam = !!side && side !== "host" ? teams[side] : null
  const activeTeamCoinStatus = getTeamCoinStatus(side)

  const isActiveTeamReady = actors.some(
    (actor) => actor.type === side && actor.ready
  )
  const isOpponentReady = actors.some(
    (actor) => actor.type !== side && actor.type !== "host" && actor.ready
  )

  const isHostReady =
    actors.some((actor) => actor.type === "host" && actor.ready) ||
    !!veto?.settings.autoStart

  const readyToFlip = isActiveTeamReady && isOpponentReady && isHostReady

  return {
    veto,
    getActor,
    actors,
    activeActor,
    match,
    teams,
    coinResult,
    activeTeam,
    activeTeamCoinStatus,
    side: side as VetoPasswordType,
    accessToken,
    seriesId,
    socketId: socket.id,
    isActiveTeamReady,
    isOpponentReady,
  }
}
