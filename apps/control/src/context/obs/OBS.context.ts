import OBSWebsocket from "obs-websocket-js"
import { createContext } from "react"
import {
  defaultObsCredential,
  OBSConnectPayload,
} from "utils/general/defaultValues"

export const obsContext = createContext({
  obs: new OBSWebsocket(),
  isConnected: false,
})

export const obsConnectionContext =
  createContext<OBSConnectPayload>(defaultObsCredential)

type ConnectionDispatch = {
  setUrl: (value: string) => void
  setPassword: (value?: string) => void
}

export const obsConnectionDispatchContext = createContext<ConnectionDispatch>({
  setUrl() {},
  setPassword() {},
})
