import { useMatches } from "utils/hooks"
import useRoom from "../../hooks/useRoom.hook"
import Schedule from "./Schedule.o"

const Schedules = () => {
  useRoom()
  const { schedule } = useMatches()

  return (
    <div>
      {schedule.length
        ? schedule.map((match) => <Schedule key={match.id} match={match} />)
        : ""}
    </div>
  )
}
export default Schedules
