import { auth } from "utils/firebase"
import { User as FireUser } from "firebase/auth"
import { PropsWithChildren } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { authContext } from "./Auth.context"
import { useDocument } from "react-firebase-hooks/firestore"
import { getUserRefById } from "utils/firebase/user.queries"
import UserModal from "../../modals/User.modal"

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user] = useAuthState(auth)

  if (!user) return <NullProvider>{children}</NullProvider>
  return <AuthDataProvider user={user}>{children}</AuthDataProvider>
}

const AuthDataProvider = ({
  children,
  user,
}: PropsWithChildren<{ user: FireUser }>) => {
  const [q, loading] = useDocument(getUserRefById(user.uid))

  if (loading) return <NullProvider>{children}</NullProvider>

  return q?.exists() ? (
    <authContext.Provider
      value={{
        userDoc: q,
        user: q.data(),
      }}
    >
      {children}
    </authContext.Provider>
  ) : (
    <authContext.Provider value={{ auth: user }}>
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

const NullProvider = ({ children }: PropsWithChildren<{}>) => {
  return <authContext.Provider value={null}>{children}</authContext.Provider>
}

export default AuthProvider
