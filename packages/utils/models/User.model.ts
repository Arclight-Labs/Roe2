import { PartialWithFieldValue } from "firebase/firestore"
import { User } from "interface"
import { getUserRef, updateUser } from "../firebase/user.queries"

export type UserUpdateData = PartialWithFieldValue<
  Pick<User, "socialHandle" | "avatar" | "username">
>

export class UserModel implements User {
  _username: string
  avatar: string
  email: string
  socialHandle: string
  uid: string
  username: string

  constructor(props: User) {
    this.uid = props.uid
    this.username = props.username
    this._username = props._username
    this.socialHandle = props.socialHandle
    this.email = props.email
    this.avatar = props.avatar
  }

  ref() {
    return getUserRef(this.uid)
  }

  async update(data: UserUpdateData) {
    return updateUser(this.uid, data)
  }

  toJSON(): User {
    const { ref, update, toJSON, ...data } = this
    return data
  }
}
