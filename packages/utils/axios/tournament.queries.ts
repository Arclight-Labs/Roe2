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

export const getAllTournaments = async () => {
  const path = "/tournaments"
  const res = await ax.get<ShallowTournaments>(path)
  return res.data
}

export const getTournament = async (
  tournamentId: string
): Promise<Waypoint.ApiResHashed> => {
  const path = `/tournaments/${tournamentId}`
  const res = await ax.get<Waypoint.ApiRes>(path)
  const data = res.data
  return {
    ...data,
    matches: new Map(Object.entries(data.matches)),
    participants: new Map(Object.entries(data.participants)),
  }
}
