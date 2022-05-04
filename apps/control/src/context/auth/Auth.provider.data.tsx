import { PropsWithChildren } from "react"
import { User } from "firebase/auth"
import { useDocument } from "react-firebase-hooks/firestore"
import { getUserRef } from "utils/firebase/user.queries"
import UserModal from "../../overlays/User.modal"
import { authContext } from "./Auth.context"
import AuthNullProvider from "./Auth.provider.null"

const AuthDataProvider = ({
  children,
  user,
}: PropsWithChildren<{ user: User }>) => {
  const [q, loading] = useDocument(getUserRef(user.uid))

  if (loading) return <AuthNullProvider loading>{children}</AuthNullProvider>

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

export default AuthDataProvider
