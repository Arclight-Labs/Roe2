import { useQuery } from "@tanstack/react-query"
import { OBSRequestTypes } from "obs-websocket-js"
import { useContext } from "react"
import {
  obsConnectionContext,
  obsConnectionDispatchContext,
  obsContext,
} from "./OBS.context"

export const useObsRequest = <Type extends keyof OBSRequestTypes>(
  type: Type,
  payload?: OBSRequestTypes[Type]
) => {
  const { obs } = useContext(obsContext)
  return useQuery([type], () => obs.call(type, payload))
}

export const useObs = () => useContext(obsContext)

export const useObsConnection = () => useContext(obsConnectionContext)
export const useObsConnectionDispatch = () =>
  useContext(obsConnectionDispatchContext)
