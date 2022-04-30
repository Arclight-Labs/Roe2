import { User } from "./User.interface"

export interface Room {
  id: string
  owner: User
  admins: string[]
  users: Record<string, User>
}
