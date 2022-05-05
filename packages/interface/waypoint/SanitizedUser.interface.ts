import { Path } from "./Path.type"
import { WaypointUser } from "./WaypointTournament.interface"

export type SanitizedUserProps =
  | "_username"
  | "username"
  | "uid"
  | "photoURL"
  | "verified"
  | "verificationExpiry"
  | "school"
export type SanitizedUser = Pick<WaypointUser, SanitizedUserProps> & Path
export type SanitizedUserMap = Record<string, SanitizedUser>
export type SanitizedUserHashMap = Map<string, SanitizedUser>
