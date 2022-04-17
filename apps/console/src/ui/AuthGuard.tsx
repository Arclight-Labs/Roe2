import { PropsWithChildren, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useQuery } from "react-query"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { checkAuth } from "utils/api"
import { useAuth, useAuthActions } from "../context/auth/Auth.hooks"
import Login from "../pages/Login"

const AuthGuard = ({ children }: PropsWithChildren<{}>) => {
  const auth = useAuth()
  const [cookies] = useCookies(["token"])
  const navigate = useNavigate()
  const { set } = useAuthActions()
  const { data } = useQuery("authCheck", checkAuth, {
    keepPreviousData: false,
    refetchInterval: 3000,
    onSuccess: set,
    onError: () => set(null),
  })
  const { pathname } = useLocation()
  const [reqLocation, setReqLocation] = useState<string | null>(null)

  useEffect(() => {
    if (cookies.token || auth) return
    navigate("/")
  }, [cookies.token, auth])

  if (!auth) return <Login />
  if (reqLocation && pathname !== reqLocation) {
    setReqLocation(null)
    return <Navigate to={reqLocation} />
  }

  return <>{children}</>
}

export default AuthGuard
