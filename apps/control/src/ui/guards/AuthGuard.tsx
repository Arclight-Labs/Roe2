import { LoadingOverlay } from "@mantine/core"
import { PropsWithChildren, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/auth/Auth.hooks"
import Login from "../../pages/Login.page"

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { loading, auth } = useAuth()

  const { pathname } = useLocation()
  const [reqLocation, setReqLocation] = useState<string | null>(null)

  if (loading) return <LoadingOverlay visible />
  if (!auth) return <Login />
  if (reqLocation && pathname !== reqLocation) {
    setReqLocation(null)
    return <Navigate to={reqLocation} />
  }

  return <>{children}</>
}

export default AuthGuard
