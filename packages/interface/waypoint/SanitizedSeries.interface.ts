import { Path } from "./Path.type"
import { Series } from "./WaypointTournament.interface"

export type SanitizedSeries = Series & Path
export type SanitizedSeriesMap = Record<string, SanitizedSeries>
export type SanitizedSeriesHashMap = Map<string, SanitizedSeries>
