import { auth } from "utils/firebase"
import { PropsWithChildren } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import AuthNullProvider from "./Auth.provider.null"
import AuthDataProvider from "./Auth.provider.data"

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, loading] = useAuthState(auth)

  if (!user) {
    return <AuthNullProvider loading={loading}>{children}</AuthNullProvider>
  }

  return <AuthDataProvider user={user}>{children}</AuthDataProvider>
}

export default AuthProvider
