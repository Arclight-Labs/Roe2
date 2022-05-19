import { useLive, useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box, Text } from "@mantine/core"
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
