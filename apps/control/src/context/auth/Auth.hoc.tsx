import { FunctionComponent } from "react"
import { UserModel } from "utils/models/User.model"
import { useAuth } from "./Auth.hooks"

export function withAuth<T>(
  Component: FunctionComponent<T & { user: UserModel }>
) {
  return ((props) => {
    const { user } = useAuth()
    if (!user) return null
    return <Component {...props} user={user} />
  }) as FunctionComponent<T>
}
