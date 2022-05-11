import { Live } from "interface/ws"
import { globalDispatch, setLiveReducer } from "../../redux"

export const setLiveListen = (live: Partial<Live>) => {
  globalDispatch(setLiveReducer(live))
}
