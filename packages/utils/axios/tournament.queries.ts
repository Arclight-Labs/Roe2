import { Waypoint } from "interface"
import { ax } from "./axios.instance"

export type ShallowTournaments = ShallowTournament[]
export interface ShallowTournament {
  id: string
  name: string
  logo: string
  org: string
  path: string
}

type GetAllTournaments = () => Promise<ShallowTournaments>
type GetTournament = (id: string) => Promise<Waypoint.ApiRes>

export const getAllTournaments: GetAllTournaments = async () => {
  const path = "/tournaments"
  const res = await ax.get<ShallowTournaments>(path)
  return res.data
}

export const getTournament: GetTournament = async (id) => {
  const path = `/tournaments/${id}`
  const res = await ax.get<Waypoint.ApiRes>(path)
  return res.data
}
