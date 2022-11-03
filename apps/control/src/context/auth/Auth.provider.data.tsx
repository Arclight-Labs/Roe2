import { User } from "firebase/auth"
import { PropsWithChildren, useEffect, useState } from "react"
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
  const [accessToken, setAccessToken] = useState("")
  useEffect(() => {
    let mounted = true
    if (!user) return mounted && setAccessToken("")

    async function getIdToken() {
      try {
        const token = await user.getIdToken(true)
        if (mounted) setAccessToken(token)
      } catch {
        if (mounted) setAccessToken("")
      }
    }

    getIdToken()

    return () => {
      mounted = false
    }
  }, [user])

  if (loading) return <AuthNullProvider loading>{children}</AuthNullProvider>

  return q?.exists() && q.data().username ? (
    <authContext.Provider
      value={{
        auth: user,
        userDoc: q,
        user: q.data(),
        loading,
        accessToken,
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
        accessToken,
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
