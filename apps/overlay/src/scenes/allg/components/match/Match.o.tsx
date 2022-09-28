import { useParams } from "react-router-dom"
import { useLive } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import Match from "./Match.c"

type Type = "active" | "upnext"
type Params = { type: Type }

const MatchScene = () => {
  useParamRoom()
  const { type = "active" } = useParams<Params>()
  const {
    live: { nextMatch, activeMatch },
  } = useLive()
  const matches = { active: activeMatch, upnext: nextMatch }
  return <Match seriesId={matches[type]} />
}

export default MatchScene
