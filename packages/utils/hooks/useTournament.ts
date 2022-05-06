import tournamentConverter from "../general/tournamentConverter.util"
import { useAppSelector } from "./redux.hook"

export const useTournament = () => {
  return useAppSelector((s) => {
    return tournamentConverter.toHashed(s.tournament)
  })
}
