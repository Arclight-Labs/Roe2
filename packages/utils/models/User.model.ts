import { PartialWithFieldValue, SetOptions } from "firebase/firestore"
import { User } from "interface"
import { UserType } from "interface/db/User.interface"
import { getUserRef, setUser, updateUser } from "../firebase/user.queries"

export type UserUpdateData = PartialWithFieldValue<
  Pick<User, "socialHandle" | "avatar" | "username" | "type">
>

export class UserModel implements User {
  _username: string
  avatar: string
  email: string
  socialHandle: string
  uid: string
  username: string
  type: UserType

  constructor(props: User) {
    this.uid = props.uid
    this.username = props.username
    this._username = props._username
    this.socialHandle = props.socialHandle
    this.email = props.email
    this.avatar = props.avatar
    this.type = props.type
  }

  ref() {
    return getUserRef(this.uid)
  }

  async update(data: UserUpdateData) {
    return updateUser(this.uid, data)
  }

  async set(data: User | Partial<User>, options: SetOptions = {}) {
    return setUser(this.uid, data, options)
  }

  toJSON(): User {
    const { ref, update, toJSON, set, ...data } = this
    return data
  }
}
