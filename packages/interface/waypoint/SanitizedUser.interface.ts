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

type OptionalFields = Partial<{
  isActive: boolean
  stats: Record<
    string,
    {
      identifier: string
      name: string
    } & ({ value: string; isNum: false } | { value: number; isNum: true })
  >
}>
export type SanitizedUser = Pick<WaypointUser, SanitizedUserProps> &
  Path &
  OptionalFields
export type SanitizedUserMap = Record<string, SanitizedUser>
