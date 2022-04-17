import { useContext } from "react"
import { authContext, authActions } from "./Auth.context"

export const useAuth = () => useContext(authContext)
export const useAuthActions = () => useContext(authActions)
