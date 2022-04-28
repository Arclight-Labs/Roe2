import { Path } from "./Path.type"
import { SanitizedUserMap } from "./SanitizedUser.interface"
import { Participant } from "./Waypoint.interface"

type OmitProps = "players" | "subs" | "teamData"
export type SanitizedParticipant = Omit<Participant, OmitProps> & {
  players: SanitizedUserMap
  subs: SanitizedUserMap
} & Path

export type SanitizedParticipantMap = Record<string, SanitizedParticipant>
