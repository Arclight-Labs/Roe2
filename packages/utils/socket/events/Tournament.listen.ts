import { Tournament } from "interface"
import { globalDispatch, setTournament } from "../../redux"

export const tournamentListen = (tournament: Tournament) => {
  console.log(tournament)
  globalDispatch(setTournament(tournament))
}
