import { SanitizedSeriesMap } from "interface/waypoint"
import { globalDispatch, setMatches } from "../../redux"

export const matchesListen = (matches: SanitizedSeriesMap) => {
  globalDispatch(setMatches(matches))
}
