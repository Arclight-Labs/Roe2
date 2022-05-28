import { AdjImage } from "../ws"
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
  identifier: string
  name: string
} & ({ value: string; isNum: false } | { value: number; isNum: true })

type OptionalFields = Partial<{
  isActive: boolean
  photoAdj: AdjImage
  stats: Record<string, Stat>
}>

type PickedUser = Pick<WaypointUser, SanitizedUserProps>
export type SanitizedUser = PickedUser & Path & OptionalFields
export type SanitizedUserMap = Record<string, SanitizedUser>
