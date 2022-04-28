import { useContext } from "react"
import { authContext } from "./Auth.context"

export const useAuth = () => useContext(authContext)
