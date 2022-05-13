import { useMatches, useParticipants } from "utils/hooks"
import { useParams } from "react-router-dom"
import useRoom from "../../hooks/useRoom.hook"
import { Image, Box } from "@mantine/core"
import { SanitizedParticipant } from "interface/waypoint"

type TeamCode =
  | "shortcode"
  | "name"
  | "shortname"
  | "schoolShortcode"
  | "school"

type Params = Record<"team" | "name", string>
const TeamName = () => {
  // add this to every overlay page
  useRoom()
  const params = useParams<Params>()
  const { chalTeams } = useParticipants()
  const { activeMatch } = useMatches()
  const teamSide = params.team === "a" ? "teamA" : "teamB"
  const teamCode = params.name as TeamCode
  const teamId = activeMatch?.[teamSide].id || ""
  const team = chalTeams[teamId]

  return (
    <Box sx={{ height: 600, width: 600 }}>
      {/* <Image src={team?.logo} height={600} width={600} fit="contain" /> */}
      <p>{team?.[teamCode]}</p>
    </Box>
  )
}
export default TeamName
