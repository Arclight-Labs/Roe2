import { SanitizedSeries, SanitizedSeriesMap } from "interface/waypoint"
import { ax } from "./axios.instance"

type GetMatches = (tourId: string) => Promise<SanitizedSeriesMap>
type GetMatch = (tourId: string, matchId: string) => Promise<SanitizedSeries>

export const getMatches: GetMatches = async (tourId) => {
  const path = `/tournaments/${tourId}/matches`
  const res = await ax.get<SanitizedSeriesMap>(path)
  return res.data
}

export const getMatch: GetMatch = async (tourId, matchId) => {
  const path = `/tournaments/${tourId}/matches/${matchId}`
  const res = await ax.get<SanitizedSeries>(path)
  return res.data
}
