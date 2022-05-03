import { PartialWithFieldValue, SetOptions } from "firebase/firestore"
import { Room, User } from "interface"
import {
  addRoomAdmins,
  getRoomRef,
  requestRoomAccess,
  RoomUpdateData,
  setRoom,
  updateRoom,
} from "../firebase/room.queries"
interface RoomConstructor {
  id: string
  name: string
  avatar: string
  admins: string[]
  owner: User
}
export class RoomModel implements Room {
  id: string
  name: string
  avatar: string
  admins: string[]
  owner: User

  constructor(props: RoomConstructor) {
    this.id = props.id
    this.name = props.name
    this.avatar = props.avatar
    this.admins = props.admins
    this.owner = props.owner
  }

  ref() {
    return getRoomRef(this.id)
  }

  addAdmins(uids: string[]) {
    return addRoomAdmins(this.id, uids)
  }

  set(data: RoomUpdateData, options: SetOptions) {
    return setRoom(this.id, data, options)
  }

  update(data: RoomUpdateData) {
    return updateRoom(this.id, data)
  }

  requestAccess(user: User) {
    return requestRoomAccess(this.id, this.name, user)
  }

  toJSON() {
    const { ref, addAdmins, set, update, ...data } = this
    return data as Room
  }
}
