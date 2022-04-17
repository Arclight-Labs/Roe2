import { Tournament } from "interface"
import { globalDispatch, setTournament } from "../../redux"

export const tournamentListen = (tournament: Tournament) => {
  globalDispatch(setTournament(tournament))
}
