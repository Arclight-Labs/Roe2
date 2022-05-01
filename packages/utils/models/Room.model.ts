import { Room, User } from "interface"
import { getRoomRef } from "../firebase/room.queries"
interface RoomConstructor {
  id: string
  admins: string[]
  owner: User
}
export class RoomModel implements Room {
  id: string
  admins: string[]
  owner: User

  constructor({ id, admins, owner }: RoomConstructor) {
    this.id = id
    this.admins = admins
    this.owner = owner
  }

  ref() {
    return getRoomRef(this.id)
  }

  addAdmins(uids: string[]) {}
}
