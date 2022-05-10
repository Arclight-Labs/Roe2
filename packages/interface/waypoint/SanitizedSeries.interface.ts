import { Path } from "./Path.type"
import { Series } from "./WaypointTournament.interface"

export type SanitizedSeries = Series & Path & { custom?: boolean }
export type SanitizedSeriesMap = Record<string, SanitizedSeries>
