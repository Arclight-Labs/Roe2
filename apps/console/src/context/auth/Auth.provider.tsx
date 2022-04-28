import { auth } from "utils/firebase"
import { User as FireUser } from "firebase/auth"
import { PropsWithChildren } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { authContext } from "./Auth.context"
import { useDocument } from "react-firebase-hooks/firestore"
import { getUserById } from "utils/firebase/user.queries"

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user] = useAuthState(auth)

  return user ? (
    <AuthDataProvider user={user}>{children}</AuthDataProvider>
  ) : (
    <authContext.Provider value={null}>{children}</authContext.Provider>
  )
}

const AuthDataProvider = ({
  children,
  user,
}: PropsWithChildren<{ user: FireUser }>) => {
  const [q, loading] = useDocument(getUserById(user.uid))

  if (loading) {
    return <authContext.Provider value={null}>{children}</authContext.Provider>
  }
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
    </authContext.Provider>
  )
}
export default AuthProvider
