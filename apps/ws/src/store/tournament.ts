import { Tournament } from "interface"

export let tournament: Tournament = { name: "", id: 0 }

export const setTournament = (payload: Partial<Tournament>) => {
  tournament = { ...tournament, ...payload }
  return tournament
}

export const getTournament = () => tournament
