import { Path } from "./Path.type"
import { SanitizedUserMap } from "./SanitizedUser.interface"
import { Participant } from "./WaypointTournament.interface"

type OmitProps = "players" | "subs" | "teamData"
export type SanitizedParticipant = Omit<Participant, OmitProps> & {
  players: SanitizedUserMap
  subs: SanitizedUserMap
  custom?: boolean
  shortname?: string
  shortcode?: string
  schoolShortcode?: string
} & Path

export type SanitizedParticipantMap = Record<string, SanitizedParticipant>
