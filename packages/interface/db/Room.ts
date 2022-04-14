import { Tournament } from "../challonge"

export interface Room {
  id: number
  name: string
  password: string | null
  tournament: Tournament
}
