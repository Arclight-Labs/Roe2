import { User } from "./User.interface"

export interface Room {
  id: string
  name: string
  avatar: string
  owner: string
  admins: string[]
  uniqueCode?: string
}

export interface RoomRequestAccess extends User {
  roomId: string
  roomName: string
}
