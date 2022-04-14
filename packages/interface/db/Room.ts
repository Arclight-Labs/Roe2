import { Tournament } from "../challonge"

export interface Room {
  _id: string
  name: string
  password: string | null
  tournament: Tournament
}
