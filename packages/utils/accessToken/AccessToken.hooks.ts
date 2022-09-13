import { useContext } from "react"
import { accessTokenContext, accessTokenDispatch } from "./AccessToken.context"

export const useAccessToken = () => useContext(accessTokenContext)
export const useAccessTokenDispatch = () => useContext(accessTokenDispatch)
