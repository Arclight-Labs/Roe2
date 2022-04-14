import { TournamentInterface } from "../challonge"

export interface RoomInterface {
  id: number
  name: string
  password: string | null
  tournament: TournamentInterface
}
