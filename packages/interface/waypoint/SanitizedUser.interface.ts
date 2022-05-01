import { Path } from "./Path.type"
import { WaypointUser } from "./Waypoint.interface"

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
