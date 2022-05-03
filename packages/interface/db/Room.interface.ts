import { User } from "./User.interface"

export interface Room {
  id: string
  name: string
  avatar: string
  owner: User
  admins: string[]
}

export interface RoomRequestAccess extends User {
  roomId: string
  roomName: string
}
