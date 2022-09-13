import { FC } from "react"
import AuthProvider from "./Auth.provider"

export function withGlobalAuth(Component: FC): FC {
  return (props) => (
    <AuthProvider>
      <Component {...props} />
    </AuthProvider>
  )
}
