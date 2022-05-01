import { Path } from "./Path.type"
import { Series } from "./Waypoint.interface"

export type SanitizedSeries = Series & Path
export type SanitizedSeriesMap = Record<string, SanitizedSeries>
