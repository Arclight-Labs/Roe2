import { PropsWithChildren } from "react"
import { authContext, defaultRoe2AuthContext } from "./Auth.context"

const AuthNullProvider = ({
  children,
  loading,
}: PropsWithChildren<{ loading: boolean }>) => {
  return (
    <authContext.Provider value={{ ...defaultRoe2AuthContext, loading }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthNullProvider
