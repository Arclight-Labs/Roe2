import { AdjSize } from "../ws"
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

export type Stat = {
  id: string
  name: string
  value: string
}

type OptionalFields = Partial<{
  isActive: boolean
  photoAdj: AdjSize
  stats: Record<string, Stat>
}>

type PickedUser = Pick<WaypointUser, SanitizedUserProps>
export type SanitizedUser = PickedUser & Path & OptionalFields
export type SanitizedUserMap = Record<string, SanitizedUser>
