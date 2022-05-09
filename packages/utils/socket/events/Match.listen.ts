import { SanitizedSeriesMap } from "interface/waypoint"
import { Payload } from "interface/ws"
import { globalDispatch, setMatches, updateMatch } from "../../redux"

export const matchesListen = (matches: SanitizedSeriesMap) => {
  globalDispatch(setMatches(matches))
}

export const setMatchListen = (payload: Payload.MatchUpdate) => {
  globalDispatch(updateMatch(payload))
}
