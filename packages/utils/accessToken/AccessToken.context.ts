import { createContext } from "react"

export const accessTokenContext = createContext("")
export const accessTokenDispatch = createContext<(token: string) => void>(
  () => {}
)
