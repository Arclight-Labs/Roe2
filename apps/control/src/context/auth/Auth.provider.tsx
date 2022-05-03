import { auth } from "utils/firebase"
import { User as FireUser } from "firebase/auth"
import { PropsWithChildren } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { authContext, defaultRoe2AuthContext } from "./Auth.context"
import { useDocument } from "react-firebase-hooks/firestore"
import { getUserRef } from "utils/firebase/user.queries"
import UserModal from "../../modals/User.modal"

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, loading] = useAuthState(auth)

  if (!user) return <NullProvider loading={loading}>{children}</NullProvider>
  return <AuthDataProvider user={user}>{children}</AuthDataProvider>
}

const AuthDataProvider = ({
  children,
  user,
}: PropsWithChildren<{ user: FireUser }>) => {
  const [q, loading] = useDocument(getUserRef(user.uid))

  if (loading) return <NullProvider loading>{children}</NullProvider>

  return q?.exists() && q.data().username ? (
    <authContext.Provider
      value={{
        auth: user,
        userDoc: q,
        user: q.data(),
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  ) : (
    <authContext.Provider
      value={{
        auth: user,
        loading: false,
        user: null,
        userDoc: null,
      }}
    >
      {children}
      <UserModal
        opened
        onClose={() => {}}
        user={user}
        withCloseButton={false}
      />
    </authContext.Provider>
  )
}

const NullProvider = ({
  children,
  loading,
}: PropsWithChildren<{ loading: boolean }>) => {
  return (
    <authContext.Provider value={{ ...defaultRoe2AuthContext, loading }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
