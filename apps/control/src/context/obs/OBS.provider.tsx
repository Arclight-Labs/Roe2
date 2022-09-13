import { FC, PropsWithChildren, useEffect, useState } from "react"
import {
  defaultObsCredential,
  OBSConnectPayload,
} from "utils/general/defaultValues"
import {
  obsConnectionContext,
  obsConnectionDispatchContext,
  obsContext,
} from "./OBS.context"
import obs from "./OBS.instance"

const ObsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [credentials, setCredentials] =
    useState<OBSConnectPayload>(defaultObsCredential)
  const [isConnected, set] = useState(obs.identified)

  const setUrl = (value: string) => {
    setCredentials((v) => ({ ...v, url: value }))
  }
  const setPassword = (value?: string) => {
    setCredentials((v) => ({ ...v, password: value }))
  }

  useEffect(() => {
    let mounted = true
    obs.on("ConnectionOpened", () => mounted && set(true))
    obs.on("ConnectionClosed", () => mounted && set(false))

    return () => {
      obs.removeListener("Hello")
      obs.removeListener("Identified")
      obs.removeListener("ConnectionOpened")
      obs.removeListener("ConnectionClosed")
      mounted = false
    }
  }, [obs, isConnected, set])

  return (
    <obsConnectionContext.Provider value={credentials}>
      <obsConnectionDispatchContext.Provider
        value={{
          setUrl,
          setPassword,
        }}
      >
        <obsContext.Provider value={{ obs, isConnected }}>
          {children}
        </obsContext.Provider>
      </obsConnectionDispatchContext.Provider>
    </obsConnectionContext.Provider>
  )
}

export default ObsProvider
