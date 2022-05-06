import { SanitizedSeriesHashMap, SanitizedSeriesMap } from "interface/waypoint"
import { ax } from "./axios.instance"

export const getMatches = async (
  tournamentId: string
): Promise<SanitizedSeriesHashMap> => {
  const path = `/tournaments/${tournamentId}/matches`
  const res = await ax.get<SanitizedSeriesMap>(path)
  return new Map(Object.entries(res.data))
}

export const getMatch = async (tournamentId: string, matchId: string) => {
  const path = `/tournaments/${tournamentId}/matches`
  return ax.get<SanitizedSeriesMap>(path)
}
