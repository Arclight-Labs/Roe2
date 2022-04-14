import { Tournament } from "../challonge"

export interface RoomInterface {
  id: number
  name: string
  password: string | null
  tournament: Tournament
}
