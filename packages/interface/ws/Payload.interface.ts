import {
  SanitizedParticipant,
  SanitizedParticipantMap,
  SanitizedSeries,
  SanitizedSeriesMap,
} from "../waypoint"

export type MatchesSet = SanitizedSeriesMap
export type MatchUpdate = { matchId: string; data: Partial<SanitizedSeries> }
export type MatchAdd = { matchId?: string; data: SanitizedSeries }

export type TeamsSet = SanitizedParticipantMap
export type TeamUpdate = {
  teamId: string
  data: Partial<SanitizedParticipant>
}
export type TeamAdd = { teamId?: string; data: SanitizedParticipant }
