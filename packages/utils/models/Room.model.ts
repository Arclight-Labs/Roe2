import {
  doc,
  PartialWithFieldValue,
  SetOptions,
  writeBatch,
} from "firebase/firestore"
import { Room, User } from "interface"
import { Broadcast, WebsocketRoom } from "interface/ws"
import { db } from "../firebase"
import {
  addRoomAdmins,
  getRoomRef,
  requestRoomAccess,
  roomColRef,
  RoomUpdateData,
  setRoom,
  updateRoom,
  getBroadcastRef,
} from "../firebase/room.queries"
interface RoomConstructor {
  id: string
  name: string
  avatar: string
  admins: string[]
  owner: string
}
export class RoomModel implements Room {
  id: string
  name: string
  avatar: string
  admins: string[]
  owner: string

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

  broadcastRef() {
    return getBroadcastRef(this.id)
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

  static create() {
    return doc(roomColRef)
  }

  async save(broadcastData: PartialWithFieldValue<Broadcast>) {
    const roomRef = this.ref()
    const broadcastRef = this.broadcastRef()
    const batch = writeBatch(db)
    batch.update(roomRef, this.toJSON())
    batch.set(broadcastRef, broadcastData, { merge: true })
    return batch.commit()
  }

  toJSON() {
    const { ref, addAdmins, set, update, save, ...data } = this
    return data as Room
  }
}
