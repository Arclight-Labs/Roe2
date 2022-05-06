import { Waypoint } from "interface"
import { globalDispatch, setTournament } from "../../redux"

export const tournamentListen = (tournament: Waypoint.ApiRes) => {
  globalDispatch(setTournament(tournament))
}
