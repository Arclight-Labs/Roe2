import { useParams } from "react-router-dom"
import { useLive } from "utils/hooks"
import useParamRoom from "utils/hooks/useParamRoom.hook"
import Match from "../match/Match.c"

const ScheduleSingleScene = () => {
  useParamRoom()
  const { num = "" } = useParams() as Record<"num", string>
  const scheduleNumber = parseInt(num) || 0
  const {
    live: { schedule },
  } = useLive()
  const match = schedule[scheduleNumber]?.matchId || ""
  return <Match blurLoser seriesId={match} />
}

export default ScheduleSingleScene
